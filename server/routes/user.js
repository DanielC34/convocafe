const User = require("../models/user");
const mustBeAuthenticated = require("../middleware");
const userRouter = require('express').Router();

userRouter.use(mustBeAuthenticated);
userRouter.get('/users/me', async (req, res) => {
    try {
        const user = await User.findOne({email: req.user.email});

        if (!user) {
            return res.status(404).send({msg: 'User not found'});
        }

        res.status(200).send(user);
    } catch (error) {
        console.log(error)
        return res.status(500).send({msg: 'Error saving user'});
    }
});

userRouter.get('/users', async (req, res) => {
    // Get all users apart from the current user
    try {
        const users = await User.find({email: {$ne: req.user.email}});

        if (!users) {
            return res.status(404).send({msg: 'No users found'});
        }
        res.status(200).send(users);
    } catch (e) {
        console.log(e);
        res.status(500).send({msg: 'Error fetching users'});
    }
});

module.exports = userRouter;