const emailModel = require("../models/email.model");
const userModel = require("../models/user.model");
const riskAnalysisModel = require("../models/riskAnalysis.model");

const getAllEmailsSend = async (req, res) => {
  try {
    const emails = await emailModel
      .find({})
      .populate("senderId", "name email pic userRole")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, emails });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getEmailById = async (req, res) => {
  const { emailId } = req.params;
  console.log(emailId);
  try {
    const email = await emailModel
      .findById(emailId)
      .populate("senderId", "name email pic userRole");
    console.log(email);
    if (!email) {
      return res
        .status(404)
        .json({ success: false, message: "Email not found" });
    }
    res.status(200).json({ success: true, email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getRiskEmails = async (req, res) => {
  try {
    const riskEmails = await riskAnalysisModel.find({}).populate("senderId","pic name").sort({ createdAt: -1 });
    res.status(200).json({ success: true, riskEmails });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getBlacklistUsers = async (req, res) => {
  try {
    const blacklistedUsers = await userModel
      .find({ isBlacklisted: true })
      .select("name email pic userRole");
    res.status(200).json({ success: true, blacklistedUsers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const blacklistUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    user.isBlacklisted = true;
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "User blacklisted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const unblacklistUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    user.isBlacklisted = false;
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "User unblacklisted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


module.exports = {
    getAllEmailsSend,
    getEmailById,
    getRiskEmails,
    getBlacklistUsers,
    blacklistUser,
    unblacklistUser,
}