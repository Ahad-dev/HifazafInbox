const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const userModel = require("../models/user.model");
dotenv.config();


const authMiddleware = (req, res, next) => {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1]; // Check both cookie and authorization header
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, async(err, decoded) => {
        if (err) {
            return res.status(403).json({ success: false, message: "Forbidden" });
        }
        
        // update data with database
        const user = await userModel.findById(decoded.id).select("-password -__v -createdAt -updatedAt");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if the user is blacklisted
        

        req.user = user; // Attach the user object to the request for later use
        
        


        next();
    });
}
const adminMiddleware = (req, res, next) => {
    if (!req.user || req.user.userRole !== "Admin") {
        return res.status(403).json({ success: false, message: "Forbidden" });
    }
    next();
};
const employeeMiddleware = (req, res, next) => {
    if (!req.user || req.user.userRole !== "Employee") {
        return res.status(403).json({ success: false, message: "Forbidden" });
    }
    next();
};



module.exports = {
    authMiddleware,
    adminMiddleware,
    employeeMiddleware
};

