const express = require("express");
const router = express.Router();
const multer = require('multer');
const { sendEmail, EmailSendByUser, getEmailStats } = require("../controllers/user.controllers");
const AnalyzeWithGemini = require("../middlewares/riskAnalysis.middleware");
const {authMiddleware,employeeMiddleware} = require("../middlewares/auth.middleware");

const storage = multer.memoryStorage();
const upload = multer({ storage });

  
router.post('/sendEmail',authMiddleware,employeeMiddleware,upload.fields([
    { name: "excelFile", maxCount: 1 },
    { name: "attachments", maxCount: 10 },
  ]),AnalyzeWithGemini,sendEmail);

  router.get("/getEmails",authMiddleware,employeeMiddleware,EmailSendByUser);
  router.get("/getEmailStats",authMiddleware,employeeMiddleware,getEmailStats);


module.exports = router;