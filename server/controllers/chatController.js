const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

//Create or fetch one to one chat
const accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body;

    //Check if userId is already provided
    if (!userId) {
        console.log("UserId param not sent with request");
        return res.sendStatus(400);
    }
    
    //Checks if a chat exists between logged in user and targeted user
    let isChat = await Chat.findOne({
        isGroupChat: false,
             users:  { $all: [req.user._id, userId]  } 
    }).populate("users", "-password").populate("latestMessage");

    //Populate sender's details for latest message
    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name email",
    });

    //If chat exists, return chat details; otherwise, create a new chat
    if (isChat) {
      res.send(isChat);
    } else {
      //Create a new one-to-one chat
      const chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId],
      };

      const createdChat = await Chat.create(chatData);

      //Fetch the created chat with populated user details
      const fullChat = await Chat.findById(createdChat._id).populate(
        "users",
        "-password"
      );
      res.status(200).json(fullChat);
    }
});

//Fetch all chats for a user
const fetchChats = asyncHandler(async (req, res) => {
    //Find all chats where logged-in user is a participant
    const results = await Chat.find({ users: req.user._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    // Populate sender details for latest message in each chat
    await User.populate(results, {
      path: "latestMessage.sender",
      select: "name email",
    });

    res.status(200).send(results);
});

//Creates new group chat
const createGroupChat = asyncHandler(async (req, res) => {
    const { users, name } = req.body;
    
  // Validate request body
  if (!users || !name) {
    return res.status(400).send({ message: "Please fill in all fields" });
    }

    //Converts users to array
  const userList = JSON.parse(users);

  if (userList.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }

    //Adds current user to list of users
  userList.push(req.user);

  //Create a new group chat
  const groupChat = await Chat.create({
    chatName: name,
    users: userList,
    isGroupChat: true,
    groupAdmin: req.user,
  });

  //Fetch the created group chat with populated user details
  const fullGroupChat = await Chat.findById( groupChat._id )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  res.status(200).json(fullGroupChat);
});

//Rename group
const renameGroup = asyncHandler(async (req, res) => {
    const { chatId, chatName } = req.body;

    //Update the chat's name
    const updatedChat = await Chat.findByIdAndUpdate(chatId,
        { chatName },{ new: true }
    ).populate("users", "-password").populate("groupAdmin", "-password");
    
    if (!updatedChat) {
        res.status(404);
        throw new Error("Chat not found");
    } else {
        res.json(updatedChat);
    }
});

//Remove user from group
const removeFromGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;

    //Remove user from the chat
    const removed = await Chat.findByIdAndUpdate(
        chatId,
        { $pull: { users: userId } }, { new: true }
    ).populate("users", "-password").populate("groupAdmin", "-password");

    if (!removed) {
        res.status(404);
        throw new Error("Chat not found");
    } else {
        res.json(removed);
    }
});

//Add user to group / Leave group chat
const addToGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;

    //Add user to the chat
    const added = await Chat.findByIdAndUpdate(chatId,
        { $push: { users: userId } },
        { new: true }
    ).populate("users", "-password").populate("groupAdmin", "-password");

    if (!added) {
        res.status(404);
        throw new Error("Chat not found");
    } else {
        res.json(added);
    }
});

module.exports = {
    accessChat,
    fetchChats,
    createGroupChat,
    renameGroup,
    addToGroup,
    removeFromGroup,
};
