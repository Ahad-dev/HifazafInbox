const axios = require("axios");
require("dotenv").config();

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Middleware function to analyze email content
async function analyzeWithGemini(req, res, next) {
  const emailBody = req.body.template; // Assuming the email body is sent in the request body

  const prompt = `
    Analyze the following email content and classify its risk level as "Low", "Medium", or "High".
    Reasons to classify as High Risk include: confidential info, salary, contracts, bank data, or vulgar language.
    Respond in this exact JSON format: 
    {
      "riskLevel": "Low/Medium/High",
      "riskScore": "Numeric value (Optional if available)",
      "flaggedWords": ["word1", "word2"], 
      "reasonSummary": "Brief explanation of why",
      "reviewedByAdmin": false
    }
    
    Email Content: ${emailBody}
  `;

  try {
    const response = await axios.post(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ]
    });

    const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log("Gemini API Response:", text);

    // Try to parse JSON safely from Gemini's response
    const jsonMatch = text.match(/\{[\s\S]*?\}/);
    if (jsonMatch) {
      const analysisResult = JSON.parse(jsonMatch[0]);

      // Attach the necessary fields to req
      req.analysisResult = {
        riskLevel: analysisResult.riskLevel || "Unknown",
        riskScore: analysisResult.riskScore || 0,
        flaggedWords: analysisResult.flaggedWords || [],
        reasonSummary: analysisResult.reasonSummary || "No reason provided",
        reviewedByAdmin: analysisResult.reviewedByAdmin || false,
      };

      return next(); // Pass control to the next middleware or route handler
    } else {
      // In case of an error or no valid response, return default values
      req.analysisResult = {
        riskLevel: "Unknown",
        riskScore: 0,
        flaggedWords: [],
        reasonSummary: "Unable to parse Gemini response",
        reviewedByAdmin: false,
      };
      return next();
    }

  } catch (err) {
    console.error("Gemini API Error:", err.message);
    req.analysisResult = {
      riskLevel: "Error",
      riskScore: 0,
      flaggedWords: [],
      reasonSummary: "API call failed",
      reviewedByAdmin: false,
    };
    return next();
  }
}

module.exports = analyzeWithGemini;
