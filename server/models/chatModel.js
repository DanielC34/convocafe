//chatModel defines the structure of the chats info in the database
// Each chats will include chats name, check if the chats is a one-to-one
// or if it is a group chats, includes the user(s) participating in the chats
// keeps track of most recent message sent in the chats
// In the case of a group chats being involved, the groupAdmin field stores the ID of the chats group admin


const mongoose = require('mongoose');

//Define schema for a chats
const chatSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

//Create a Chat model based on the schema
const Chat = mongoose.model("Chat", chatSchema);

//Export Chat model created
module.exports = Chat;