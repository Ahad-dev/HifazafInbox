const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  pic:{
    type: String,
  },
  email: {
    type: String,
    require: true,
  },
  userRole: {
    type: String,
    enum: ["Admin", "Employee"],
    require: true,
  },
  refreshToken: String,
  accessToken: String,
  tokenExpiry: Number,
  isBlacklisted: {
    type: Boolean,
    default: false,
  },
}, {
    timestamps: true,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
