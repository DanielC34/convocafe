const User = require("../models/user");
const mustBeAuthenticated = require("../middleware");
const userRouter = require('express').Router();


userRouter.use(mustBeAuthenticated);
userRouter.get('/users/me', (req, res) => {
    const user = User.findOne({email: req.user.email});

    if (!user) {
        return res.status(404).send({msg: 'User not found'});
    }

    res.status(200).send(user);
});

userRouter.get('/users', (req, res) => {
    // Get all users apart from the current user
    const users = User.find({email: {$ne: req.user.email}});

    if (!users) {
        return res.status(404).send({msg: 'No users found'});
    }

    res.status(200).send(users);
});

module.exports = userRouter;