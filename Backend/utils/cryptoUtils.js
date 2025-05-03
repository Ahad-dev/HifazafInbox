
const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config();

const AES_SECRET_KEY = Buffer.from(process.env.AES_SECRET_KEY, 'hex');

const IV_LENGTH = 16; // AES block size

// Encrypt using AES-256-CBC
function encryptAES(plainText) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv("aes-256-cbc", AES_SECRET_KEY, iv);
  let encrypted = cipher.update(plainText, "utf8", "base64");
  encrypted += cipher.final("base64");
  return {
    iv: iv.toString("base64"),
    encryptedData: encrypted,
  };
}

// Decrypt AES-256-CBC encrypted text
function decryptAES(encryptedData, ivBase64) {
  const iv = Buffer.from(ivBase64, "base64");
  const decipher = crypto.createDecipheriv("aes-256-cbc", AES_SECRET_KEY, iv);
  let decrypted = decipher.update(encryptedData, "base64", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

// Generate SHA-256 hash of a string
function generateSHA256Hash(text) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

// Export functions
module.exports = {
  encryptAES,
  decryptAES,
  generateSHA256Hash,
};
