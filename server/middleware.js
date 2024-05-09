const jwt = require('jsonwebtoken');

// Middleware function to validate token for user authentication
const mustBeAuthenticated = (req, res, next) => {
    //Extract the token from the authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract the token from "Bearer TOKEN"
    if (token == null) return res.sendStatus(401); // if there's no token, return error 401(Unauthorized)

    //Verify token using JWT secret key
    const jwtSecret = process.env.JWT_SECRET;
    jwt.verify(token, jwtSecret, (err, user) => {
        //Handles token verification errors
        if (err) {
            console.error(err);
            return res.status(403).send({message: 'Token is no longer valid', invalidToken: true}); //Returns error 403(Forbidden) status when token is no longer valid
        }

        //Attach user info from the token to the request object
        req.user = user;
        next(); //Proceed to next middleware or router
    });
};

module.exports = mustBeAuthenticated; //Export mustBeAuthenticated middleware to be used elsewhere in application