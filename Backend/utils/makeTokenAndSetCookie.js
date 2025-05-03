const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

const makeTokenAndSetCookie = (user, res) => {
    const token = jwt.sign(
        {
        id: user._id,
        email: user.email,
        name: user.name,
        pic: user.pic,
        userRole: user.userRole,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "30d" }
    );
    
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
    return token
}

module.exports = {
    makeTokenAndSetCookie,
};