const {Schema, model} = require("mongoose");
const messageSchema = new Schema({
        sender: {type: Schema.Types.ObjectId, ref: "User", required: true},
        chat: {type: Schema.Types.ObjectId, ref: "Chat", required: true},
        content: {type: String, required: true},
        read: {type: Boolean, default: false},
        timestamp: {type: Date, default: Date.now}
    },
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