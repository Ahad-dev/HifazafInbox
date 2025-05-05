const userModel = require("../models/user.model");
const riskAnalysisModel = require("../models/riskAnalysis.model");
const { oAuth2Client } = require("../lib/google");
const { createTransporter } = require("../lib/nodemailer");
const xlsx = require("xlsx");
const handlebars = require("handlebars");
const emailModel = require("../models/email.model");
const { encryptAES, generateSHA256Hash } = require("../utils/cryptoUtils");
const mongoose = require("mongoose");

const sendEmail = async (req, res) => {
  const { userEmail, template, subject } = req.body;

  const excelFile = req.files?.excelFile[0];
  const attachmentFile = req.files?.attachments || [];
  console.log(req.files);
  console.log(attachmentFile);
  const riskAnalysis = req.analysisResult; // Assuming this is set by the middleware

  if (!userEmail || !template || !subject || !excelFile) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the fields" });
  }

  try {
    const user = await userModel.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Step 1: Encrypt the email body
    const { encryptedData, iv } = encryptAES(template);

    // Step 2: Hash the original (unencrypted) message for integrity
    const bodyHash = generateSHA256Hash(template);

    if (riskAnalysis.riskLevel === "High") {
      // created email model instance
      const emailDetails = {
        senderId: user._id,
        receiverEmails: [userEmail],
        subject: subject, // (Optional: you can encrypt this too)
        body: encryptedData, // encrypted version
        iv: iv, // store the IV for decryption
        hash: bodyHash, // original SHA-256 hash
        attachments: attachmentFile.map((file) => file.originalname),
        status: "failed",
      };
      await emailModel.create(emailDetails);
      const riskAnalysisData = {
        senderId: user._id,
        emailId: emailDetails._id,
        riskLevel: riskAnalysis.riskLevel,
        riskScore: riskAnalysis.riskScore,
        flaggedWords: riskAnalysis.flaggedWords,
        reasonSummary: riskAnalysis.reasonSummary,
        reviewedByAdmin: riskAnalysis.reviewedByAdmin,
      };
      await riskAnalysisModel.create(riskAnalysisData);
      

      return res
        .status(400)
        .json({
          success: false,
          AtRisk: true,
          message: "Email content is flagged as high risk",
        });
    }

    const now = Date.now();
    const expiryDate = user.tokenExpiry;
    if (!user.accessToken || now >= expiryDate) {
      // Access token is expired or not present, refresh it
      oAuth2Client.setCredentials({ refresh_token: user.refreshToken });
      const refreshedTokens = await oAuth2Client.refreshAccessToken();
      const tokens = refreshedTokens.credentials; // ✅ accessToken is here

      user.accessToken = tokens.access_token;
      user.tokenExpiry = tokens.expiry_date;

      await user.save();
    }

    // Parse Excel file
    const workbook = xlsx.read(excelFile.buffer, { type: "buffer" });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(worksheet);


    const transporter = createTransporter(user);

    const compliedTemplate = handlebars.compile(template);

    const results = [];
    for (const row of data) {
      try {
        const htmlContent = compliedTemplate(row);

        const mailOption = {
          from: `"${userEmail}" <${userEmail}>`,
          to: row.email,
          subject: subject,
          html: htmlContent,
          attachments: attachmentFile.map((file) => ({
            filename: file.originalname,
            content: file.buffer,
          })),
        };
        await transporter.sendMail(mailOption);

        results.push({
          email: row.email,
          status: "success",
        });
      } catch (emailError) {
        results.push({
          email: row.email,
          status: "error",
          error: emailError.message,
        });
      }
    }

    // Step 3: Prepare email data for DB
    const emailDetails = {
      senderId: user._id,
      receiverEmails: data.map((row) => row.email),
      subject: subject, // (Optional: you can encrypt this too)
      body: encryptedData, // encrypted version
      iv: iv, // store the IV for decryption
      hash: bodyHash, // original SHA-256 hash
      attachments: attachmentFile.map((file) => file.originalname),
      status: "success",
    };

    await emailModel.create(emailDetails);
    // Send response

    res.json({
      success: true,
      message: "Bulk emails processed",
      results: results,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `sendEmail : ${err.message}`,
    });
  }
};

const EmailSendByUser = async (req, res) => {
  // Get the user ID from the request object (assuming it's set by auth middleware)
  const { id } = req.user;

  try {
    // Find emails sent by the user
    const emails = await emailModel
      .find({ senderId: id })
      .populate("senderId", "name email");

    if (!emails) {
      return res
        .status(404)
        .json({ success: false, message: "No emails found" });
    }

    res.status(200).json({ success: true, emails });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: `EmailSendByUser : ${err.message}` });
  }
};

// make the route that will get total emails sent by the user and successful emails sent by the user and failed or risked emails sent by the user or all total number of recipients do all this with aggregation
const getEmailStats = async (req, res) => {
  const { id } = req.user;
  console.log(id);

  try {
    // totalEmails , successfulEmails , failedEmails, totalRecipients
    // Use aggregation to get the stats

    const stats = await emailModel.aggregate([
      { $match: { senderId: new mongoose.Types.ObjectId(id) } },
      {
        $group: {
          _id: null,
          totalEmails: { $sum: 1 },
          successfulEmails: {
            $sum: {
              $cond: [
                { $eq: [{ $toLower: "$status" }, "success"] },
                1,
                0,
              ],
            },
          },
          failedEmails: {
            $sum: {
              $cond: [
                { $eq: [{ $toLower: "$status" }, "failed"] },
                1,
                0,
              ],
            },
          },
          totalRecipients: { $sum: { $size: "$receiverEmails" } },
        },
      },
    ]);
    console.log(stats);
        

    res.status(200).json({ success: true, stats: stats[0] || {} });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: `getEmailStats : ${err.message}`,
    });
  }
};


module.exports = {
  sendEmail,
  EmailSendByUser,
  getEmailStats
};
