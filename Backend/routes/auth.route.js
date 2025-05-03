const express = require("express");
const router = express.Router();

const {generateGoogleOAuthURL,handleOAuthCallback,getUser} = require("../controllers/auth.controllers");
const {authMiddleware} = require("../middlewares/auth.middleware")



router.get('/login',generateGoogleOAuthURL);
router.get('/callback',handleOAuthCallback);
router.get("/user",authMiddleware,getUser)
router.get("/logout",authMiddleware,(req,res)=>{
    res.clearCookie("token");
    res.status(200).json({success:true,message:"Logout successful"});
})

module.exports = router;
