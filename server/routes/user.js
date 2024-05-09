const User = require("../models/user");
const mustBeAuthenticated = require("../middleware");
const { Chat } = require("../models/chat");

//Set up userRouter and apply authentication middleware
const userRouter = require('express').Router();
userRouter.use(mustBeAuthenticated);

//Route to get current user's details (GET /users/me)
userRouter.get('/users/me', async (req, res) => {
    try {
        //Find the user using their email from authenticated request
        const user = await User.findOne({email: req.user.email});

        //Returns an error message if user is not found
        if (!user) {
            return res.status(404).send({msg: 'User not found'});
        }

        //Sends the user details in the response
        res.status(200).send(user);
    } catch (error) {
        console.log(error)
        return res.status(500).send({msg: 'Error saving user'});
    }
});

//Route to get all users except the current user (GET /users)
userRouter.get('/users', async (req, res) => {
    // Get all users apart from the current user
    try {
        let users = await User.find({email: {$ne: req.user.email}}).lean();

        //Modify user objects and check if they have a chat with current user
        for (let user of users) {
            user.id = user._id;
            delete user._id;
            delete user.__v;

            //Check if a chat exists with the current user and user in the loop
            const hasChat = await Chat.exists({participants: {$all: [req.user.id, user.id]}})
            user.hasChat = !!hasChat;
        }

        //Return an error message if no users are found
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