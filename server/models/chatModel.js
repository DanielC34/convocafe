// //chatModel defines the structure of the chat info in the database
// // Each chat will include chat name, check if the chat is a one-to-one
// // or if it is a group chat, includes the user(s) participating in the chat
// // keeps track of most recent message sent in the chat
// // In the case of a group chat being involved, the groupAdmin field stores the ID of the chat group admin

const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
