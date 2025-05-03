const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const createTransporter = (user)=>{
    const email = user.email;

    return nodemailer.createTransport({
        service:"gmail",
        auth:{
            type:"OAuth2",
            user:email,
            clientId:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
            refreshToken:user.refreshToken,
            accessToken:user.accessToken,

        },
        debug:true,
    })
}

module.exports = {
    createTransporter
};