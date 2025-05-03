const express = require("express");
const router = express.Router();
const {authMiddleware,adminMiddleware} = require("../middlewares/auth.middleware");
const {blacklistUser,getAllEmailsSend,getBlacklistUsers,getEmailById,getRiskEmails,unblacklistUser} = require("../controllers/admin.controllers");


router.get("/getAllEmails",authMiddleware,adminMiddleware,getAllEmailsSend);
router.get("/getEmail/:emailId",authMiddleware,adminMiddleware,getEmailById);
router.get("/getRiskEmails",authMiddleware,adminMiddleware,getRiskEmails);
router.get("/getBlacklistUsers",authMiddleware,adminMiddleware,getBlacklistUsers);
router.put("/blacklistUser/:userId",authMiddleware,adminMiddleware,blacklistUser);
router.put("/unblacklistUser/:userId",authMiddleware,adminMiddleware,unblacklistUser);

module.exports = router;

