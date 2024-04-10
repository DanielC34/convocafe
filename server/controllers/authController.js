const User = require("../models/userModel");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

//Validating user input using express-validator middleware
const validateInput = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array()[0].msg });
    }
    next();
 }


//Registering a new user
exports.signup = async (req, res) => {
    try {

        const user = await User.create(req.body);
        res.json({
            id: user._id, name: user._name, email: user._email
        })
    } catch (err) {
        let errorMessage = "Error creating user";
        if (err.code === 11000) {
            errorMessage = "User already exists, please sign in";
        }
        return res.status(500).json({ error: errorMessage })
    }
};

//Authentication of existing user
exports.signin = async (req, res) => {
    try {
        const { email: userEmail, password } = req.body;
        const user = await User.findOne({ email: userEmail });
        if (!user || !user.authenticate(password)) {
            return res.status(401).json({ error: "Incorrect email or password. Please check them both" });
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.cookie("token", token, { expire: new Date() + 9999 });
        const { _id, name, email } = user;
        res.json({ token, user: { _id, name, email } });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server Error" });
    }
};

//Clearing the user token
exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({ message: "User has signed out" });
};

//Middleware to check if user is signed in
exports.isSignedIn = (req, res, next) => {
    try {
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: "Unauthorized user!!" });
    }
};

//Middleware to check if user is authenticated
exports.isAuthenticated = (req, res, next) => {
    const isSameUser = req.profile && req.user && req.profile._id.toString() === req.user._id;
    if (!isSameUser) {
        return res.status(403).json({ error: "Access Denied!!" });
    }
    next();
}