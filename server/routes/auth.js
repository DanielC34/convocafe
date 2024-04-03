const express = require("express");
const jwt = require('jsonwebtoken');
const authRouter = express.Router();
const User = require("../models/user");
const bcrypt = require('bcrypt');

const saltRounds = 10;
authRouter.post('/auth/signup', async (req, res) => {
    const {email, username, password} = req.body;
    // Basic validation
    if (!email || !username || !password) {
        return res.status(400).send({msg: 'Missing email, username, or password'});
    }

    try {
        // Check if user already exists
        const userExists = await User.findOne({email});
        if (userExists) {
            return res.status(400).send({msg: 'User already exists'});
        }

        // Add user to the stores
        const hash = bcrypt.hashSync(password, saltRounds);
        const user = new User({email, username, password: hash});
        await user.save();

        const userObj = user.toObject();
        delete userObj.password;
        res.status(201).send(userObj);
    } catch (error) {
        console.log(error)
        return res.status(500).send({msg: 'Error saving user'});
    }
});


authRouter.post('/auth/login', async(req, res) => {
    const {email, password} = req.body;
    // Basic validation
    if (!email || !password) {
        return res.status(400).send({msg: 'Missing email or password'});
    }

    try {
        // Check if user exists and password matches
        const user = await User.findOne({email}).select('+password');
        if (!user) {
            return res.status(401).send({msg: 'Invalid email or password'});
        }

        const match = bcrypt.compareSync(password, user.password);
        if (!match) {
            return res.status(401).send({msg: 'Invalid email or password'});
        }

        // Create and sign a token
        const jwtSecret = process.env.JWT_SECRET;
        const token = jwt.sign({id: user.id, email}, jwtSecret, {expiresIn: '24h'});
        res.status(200).send({token, msg: 'Login successful'});

    } catch (error) {
        console.log(error)
        return res.status(500).send({msg: 'Error logging in'});
    }
});

module.exports = authRouter;