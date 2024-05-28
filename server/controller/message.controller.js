import { getReceiverSocketId, io } from "../SocketIO/server.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";


export const sendMessage = async (req, res) => { //Function to send a message
  try {
    const { message } = req.body; // Extracting message from request body
    const { id: receiverId } = req.params; // Extracting receiverId from request params
    const senderId = req.user._id; // Gets current logged in user's id
    let conversation = await Conversation.findOne({
      //Finding conversation with sender and receiver
      members: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      //If conversation does not exist, create a new one
      conversation = await Conversation.create({
        members: [senderId, receiverId],
      });
    }
    const newMessage = new Message({
      // Creating a new message
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id); // Add message to conversation
    }
    // await conversation.save()
    // await newMessage.save();
    await Promise.all([conversation.save(), newMessage.save()]); // Save conversation and message in parallel
    const receiverSocketId = getReceiverSocketId(receiverId); // Get receiver's socket id
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage); // Emit new message event to receiver
    }
    res.status(201).json(newMessage); // Return new message in response
  } catch (error) {
    console.log("Error in sendMessage", error); // Log error if any
    res.status(500).json({ error: "Internal server error" }); // Send internal server error response
  }
};

export const getMessage = async (req, res) => { // Function to get messages for a conversation
  try {
    const { id: chatUser } = req.params; // Extracting chatUser id from request params
    const senderId = req.user._id; // Getting current logged in user's id
    let conversation = await Conversation.findOne({
      // Finding conversation with sender and chatUser
      members: { $all: [senderId, chatUser] }, // Populating messages in conversation
    }).populate("messages");
    if (!conversation) {
      return res.status(201).json([]); // If conversation does not exist, return empty array
    }
    const messages = conversation.messages; // Get messages from conversation
    res.status(201).json(messages); // Return messages in respons
  } catch (error) {
    console.log("Error in getMessage", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
