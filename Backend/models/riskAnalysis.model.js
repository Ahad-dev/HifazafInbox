const mongoose = require("mongoose");

const RiskAnalysisSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    emailId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Email",
      required: true,
    },
    riskLevel: {
      type: String,
      enum: ["Low", "Medium", "High"],
    },
    riskScore: {
      type: Number,
    },
    flaggedWords: {
      type: [String],
      default: [],
    },
    reasonSummary: {
      type: String,
    },
    reviewedByAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const RiskAnalysis = mongoose.model("RiskAnalysis", RiskAnalysisSchema);
module.exports = RiskAnalysis;
