const { Schema, model } = require("mongoose");

//MessageSchema defined using mongoose Schema
const messageSchema = new Schema({
        sender: {type: Schema.Types.ObjectId, ref: "User", required: true}, //Reference to the sender(User)
        chat: {type: Schema.Types.ObjectId, ref: "Chat", required: true}, //Reference to the chat
        content: {type: String, required: true}, //content of message (required string)
        read: {type: Boolean, default: false}, //view status of the message(has it been read or not)
        timestamp: {type: Date, default: Date.now} //timestampt of when message was created
},
    // Create schema for group chat 
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
        toJSON: {
            virtuals: true,
            transform: function (doc, ret) {
                // Add id field with value of _id
                ret.id = ret._id;
                // Delete _id and __v
                delete ret._id;
                delete ret.__v;
                return ret;
            },
        }, // Allows virtual fields to be returned when model is converted to JSON
        toObject: {
            virtuals: true,
            transform: function (doc, ret) {
                // Add id field with value of _id
                ret.id = ret._id;
                // Delete _id and __v
                delete ret._id;
                delete ret.__v;
                return ret;
            },
        } // Allows virtual fields to be returned when model is converted to an object
    }
);


module.exports = model("Message", messageSchema);