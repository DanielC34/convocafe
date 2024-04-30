const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

//Middleware function to protect routes that require user authentication
const protect = asyncHandler(async (req, res, next) => {
    let token;

    //Check if request has authorised header with bearer token
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            //Extract token from authorization header
            token = req.headers.authorization.split(" ")[1];

            //Verify the token and decode user ID
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, process.env);

            //Find user by decoded user ID and exclude password from response
            req.user = await User.findById(decoded.id).select("-password");

            //Proceed to the next middleware
            next();
        } catch (err) {
            //Handle token verification error(s)
            res.status(401);
            throw new Error("Not authorized, token failure");
        }
    }

    //If token is not provided in request header
    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

module.exports = { protect };