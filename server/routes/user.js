const User = require("../models/user");
const mustBeAuthenticated = require("../middleware");
const {Chat} = require("../models/chat");
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
        let users = await User.find({email: {$ne: req.user.email}}).lean();

        for (let user of users) {
            user.id = user._id;
            delete user._id;
            delete user.__v;

            const hasChat = await Chat.exists({participants: {$all: [req.user.id, user.id]}})
            user.hasChat = !!hasChat;
        }

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