const {Schema, model} = require("mongoose");
const chatSchema = new Schema(
    {
        type: {type: String, required: true},
        participants: [{type: Schema.Types.ObjectId, ref: "User", required: true}]
    }, {
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
        toObject: {virtuals: true} // Allows virtual fields to be returned when model is converted to an object
    }
);


const findByRecipientsOrSave = async (participants) => {
    const chat = await Chat.findOne({
        participants: {
            $all: participants
        }
    });

    if (chat) {
        return chat;
    }

    const newChat = new Chat({
        type: 'private',
        participants
    });

    await newChat.save();
    return newChat;
};


const Chat = model("Chat", chatSchema);

module.exports = {
    Chat,
    findByRecipientsOrSave
};