const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

//Middleware function to verify JWT protected routes
const verifyToken = asyncHandler(async (req, res, next) => {
    //Extract token from authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        res.status(401);
        throw new Error("Unauthorized - No token provided")
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        res.status(401);
        throw new Error("Unauthorized - No token provided")
    }

    const jwtSecret = process.env.JWT_SECRET;

    try {
        const decoded = jwt.verify(token, jwtSecret);

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            res.status(401);
            throw new Error("Unauthorized - User not found")
        }

        req.user = user;
        next();
    } catch (err) {
        console.error("Token verification error:", err);
        res.status(401).json({ error: "Unauthorized - Invalid token" });
    }
});

//Middleware function to protect routes that require user authentication
const protect = asyncHandler(async (req, res, next) => {
    try {
        await verifyToken(req, res, next);
    } catch (err) {
        console.error("Token verification error:", err.message);
        res.status(401).json({ error: "Unauthorized - Token verification failed" });
    }
});

module.exports = { protect, verifyToken };