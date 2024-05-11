const User = require("../models/user");
const mustBeAuthenticated = require("../middleware");
const { Chat, Group } = require("../models/chat");

//Set up userRouter and apply authentication middleware
const userRouter = require('express').Router();
userRouter.use(mustBeAuthenticated);

//Route to create a new group (POST /groups)
userRouter.post('/groups', async (req, res) => {
    try {
      //Extract necessary data from request body
      const { groupName, selectedUsers } = req.body;

      if (!groupName || !selectedUsers || Array.isArray(selectedUsers)) {
        return res
          .status(400)
          .send({ msg: "Invalid request. Missing required data" });
      }

      //Create a new group
      const group = new Group({ name: groupName, members: selectedUsers });

      //Save the group in the database
      await group.save();

      //Respond with created group object
      res.status(201).send({msg: "Group created successfully", group});
    } catch (err) {
        console.error("Error creating group: ", err);
        res.status(500).send({ msg: 'Failed to create group' });
    }
});

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