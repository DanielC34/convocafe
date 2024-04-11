// //messageModel defines what info about the messages is to be stored
// //namely the sender of the message, the content of the message
// //and which chat the message belongs to/ who it is meant for
// //be it one user or a group of users


// const mongoose = require("mongoose");

// //Define the message Schema
// const messageSchema = mongoose.Schema(
//   {
//     sender: { type: mongoose.Schema.ObjectId.Types.ObjectId, ref: "User" },
//     content: { type: String, trim: true },
//     chat: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Chat",
//     },
//   },
//   { timestamps: true } // Automatically adds the time when the message was sent
// );

// // Creates model for messages
// const Message = mongoose.model("Message", messageSchema);

// //exports the message model created
// module.exports = Message;
