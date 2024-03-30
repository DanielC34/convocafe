const jwt = require('jsonwebtoken');

// Middleware to validate token
const mustBeAuthenticated = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN"
    if (token == null) return res.sendStatus(401); // if there's no token

    const jwtSecret = process.env.JWT_SECRET;

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) return res.sendStatus(403); // token no longer valid
        req.user = user;
        next();
    });
};

module.exports = mustBeAuthenticated;