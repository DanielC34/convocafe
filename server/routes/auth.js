const express = require("express");
const jwt = require('jsonwebtoken');
const mustBeAuthenticated = require("../middleware");
const authRouter = express.Router();


// In-memory user store
let users = [];

authRouter.post('/signup', (req, res) => {
    const {email, username, password} = req.body;
    // Basic validation
    if (!email || !username || !password) {
        return res.status(400).send('Missing email, username, or password');
    }
    // Check if user already exists
    const userExists = users.some(user => user.email === email);
    if (userExists) {
        return res.status(400).send('User already exists');
    }
    // Add user to the store
    users.push({email, username, password});
    res.status(201).send('User created');
});


authRouter.post('/login', (req, res) => {
    const {email, password} = req.body;
    // Basic validation
    if (!email || !password) {
        return res.status(400).send({msg: 'Missing email or password'});
    }
    // Check if user exists and password matches
    const user = users.find(user => user.email === email && user.password === password);
    if (!user) {
        return res.status(401).send({msg: 'Invalid email or password'});
    }

    // Create and sign a token
    const jwtSecret = process.env.JWT_SECRET;
    const token = jwt.sign({email}, jwtSecret, {expiresIn: '24h'});
    res.status(200).send({token, msg: 'Login successful'});
});


authRouter.use(mustBeAuthenticated);
authRouter.get('/users/me', (req, res) => {

    const user = users.find(user => user.email === req.user.email);

    if (!user) {
        return res.status(404).send('User not found');
    }

    res.status(200).send(user);
});


module.exports = authRouter;