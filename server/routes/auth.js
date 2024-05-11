const express = require("express");
const jwt = require('jsonwebtoken');

//Create a new router instance with Express
const authRouter = express.Router();
const User = require("../models/user");
const bcrypt = require('bcrypt');

const saltRounds = 10;

//Route for user signup (POST /auth/signup)
authRouter.post('/auth/signup', async (req, res) => {
    const {email, username, password} = req.body;
    // Basic validation to check if any of the fields is missing/not filled in
    if (!email || !username || !password) {
        return res.status(400).send({msg: 'Missing email, username, or password'});
    }

    try {
        // Check if user already exists in the database and returns error message is user already exists
        const userExists = await User.findOne({email});
        if (userExists) {
            return res.status(400).send({msg: 'User already exists'});
        }

        // Otherwise, Add user to the stores (hash the password with bcrypt before saving it to database)
        const hash = bcrypt.hashSync(password, saltRounds);
        const user = new User({email, username, password: hash});
        await user.save();

        //Prepare response object (remove password field) and send response
        const userObj = user.toObject();
        delete userObj.password;
        res.status(201).send(userObj);
    } catch (error) {
        console.log(error)
        return res.status(500).send({msg: 'Error saving user'});
    }
});

//Route for user login (POST /auth/login)
authRouter.post('/auth/login', async(req, res) => {
    const {email, password} = req.body;
    // Basic validation
    if (!email || !password) {
        return res.status(400).send({msg: 'Missing email or password'});
    }

    try {
        // Check if user exists and password matches (which is not selected by default)
        const user = await User.findOne({email}).select('+password');
        if (!user) {
            return res.status(401).send({msg: 'Invalid email or password'});
        }

        //Compare provided password with hashed password and return error response if it does not match
        const match = bcrypt.compareSync(password, user.password);
        if (!match) {
            return res.status(401).send({msg: 'Invalid email or password'});
        }

        // Otherwise, create and sign a JSON web token for authentication
        const jwtSecret = process.env.JWT_SECRET;
        const token = jwt.sign({id: user.id, email}, jwtSecret, {expiresIn: '24h'});
        res.status(200).send({token, msg: 'Login successful'});

    } catch (error) {
        console.log(error)
        return res.status(500).send({msg: 'Error logging in'});
    }
});

//Export authRouter to be used in other parts of the application
module.exports = authRouter;