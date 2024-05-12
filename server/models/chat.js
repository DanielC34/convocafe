const { Schema, model } = require("mongoose");


// ChatSchema defined using mongoose Schema
const chatSchema = new Schema(
    {
        type: {type: String, required: true}, //Type field is defined as required string
        participants: [{type: Schema.Types.ObjectId, ref: "User", required: true}], //Participants defined as required array of User IDs for referencing in validation
        name: { type: String, },
    }, {
        timestamps: true, // Automatically adds createdAt and updatedAt fields. Shows when chat was create/updated
        toJSON: {
            virtuals: true, //allows virtual fields to be defined when converting documents to JSON
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
        }, // Allows virtual fields to be returned when model is converted to an object
    }
);

//Function to find an existing chatroom with specific participants or create a new one if one does not exist
const findByRecipientsOrSave = async (participants) => {
    const chat = await Chat.findOne({
        participants: {
            $all: participants,
        }
    });

    //Checks if a chatroom with same participants exists
    if (chat) {
        return chat; //If it exists, it returns that chatroom
    }

    //Creates a new chat room otherwise and saves it.
    const newChat = new Chat({
        type: 'private',
        participants,
    });

    await newChat.save();
    return newChat;
};

//Creates Chat model based on chatSchema 
const Chat = model("Chat", chatSchema);

//Export Chat model and findByRecipientsOrSave function for use in other parts of program
module.exports = {
    Chat,
    findByRecipientsOrSave,
};