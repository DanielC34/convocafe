const express = require("express");
const {
    accessChat,
    fetchChats,
    createGroupChat,
    removeFromGroup,
    addToGroup,
    renameGroup,
} = require("../controllers/chatController");
const { protect } = require("../middleware/authMiddleware");

//Create a new router instance from Express
const router = express.Router();

//Define routes with corresponding authentication middleware and controller functions
router.route("/").post(protect, accessChat); //Route to access a chat(send a message)
router.route("/").get(protect, fetchChats); //Route to fetch all chats
router.route("/group").post(protect, createGroupChat); //Route to create a group chat
router.route("/rename").put(protect, renameGroup); //Route to rename a group
router.route("/adduser").put(protect, addToGroup); //Route to add a user to a group
router.route("/removeuser").put(protect, removeFromGroup); //Route to remove a user from a group

//Export the router with defined routes
module.exports = router;