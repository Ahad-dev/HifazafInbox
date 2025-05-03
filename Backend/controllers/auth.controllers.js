const {oAuth2Client} = require("../lib/google");
const userModel = require("../models/user.model");
const { makeTokenAndSetCookie } = require("../utils/makeTokenAndSetCookie");
const dotenv = require("dotenv");
dotenv.config();


const generateGoogleOAuthURL = (req,res)=>{
    try{

        const scopes = [
            "https://www.googleapis.com/auth/userinfo.email",
            "https://mail.google.com",
            "https://www.googleapis.com/auth/userinfo.profile",
        ];
        
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes,
            prompt: 'consent',
        });
        res.status(200).json({url:authUrl,success:true,message:"Redirecting to Google for authentication"});
    }catch(err){
        console.error(err);
        res.status(500).json({success:false,message:"generateGoogleOAuthURL :Internal Server Error"});
    }
}

const handleOAuthCallback = async (req,res)=>{
    try{
        const {code} = req.query;
        const {tokens} = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials({
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            scope: tokens.scope,
            token_type: tokens.token_type,
            expiry_date: tokens.expiry_date
        });

        const userInfo = await oAuth2Client.request({url: 'https://www.googleapis.com/oauth2/v3/userinfo'});
        const {email, name, picture} = userInfo.data;

        console.log(userInfo.data);
        
        // if user alread exists, update the tokens and return the user
        let user = await userModel.findOne({email});
        if(user){
            user.accessToken = tokens.access_token;
            user.refreshToken = tokens.refresh_token;
            await user.save();
        }else{
            // if user does not exist, create a new user
            user = await userModel.create({
                email,
                name,
                pic:picture,
                accessToken: tokens.access_token,
                refreshToken: tokens.refresh_token,
                userRole:"Employee",    
            });
        }

        if(!user){
            return res.status(400).json({success:false,message:"User creation failed"});
        }

        // Set the token in the cookie
        const token = makeTokenAndSetCookie(user,res);

        // redirect to the frontend with the token
        res.redirect(`${process.env.CLIENT_URL}`);

        res.status(200).json({success:true,message:"Authentication successful",userInfo:{email, name, pic:user.pic,userRole:user.userRole,isBlackListed:user.isBlacklisted},token});
    }catch(err){
        console.error(err);
        res.status(500).json({success:false,message:"handleOAuthCallback: Internal Server Error"});
    }
}

const getUser = async (req,res)=>{
    // Get the user from the request object
    const user = req.user;
    

    if(!user){
        return res.status(400).json({success:false,message:"User not found"});
    }
    res.status(200).json({success:true,message:"User found",user:user});   
}


module.exports = {
    generateGoogleOAuthURL,
    handleOAuthCallback,
    getUser
}