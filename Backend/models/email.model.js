const mongoose = require("mongoose");

const EmailSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverEmails: {
        type: [String], // External recipients
        required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    iv:{
      type: String,
      required: true,
    },
    hash: {
      type: String,
      required: true,
    },
    attachments: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["success", "failed"],
      default: "success",
    },
  },
  {
    timestamps: true,
  }
);

const Email = mongoose.model("Email", EmailSchema);
module.exports = Email;
