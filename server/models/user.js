//userModel keeps track of who is using the app with info like
// name, email, password and profile picture

const {Schema, model} = require('mongoose');

//Define the user schema
const userSchema = new Schema({
        username: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true, select: false},
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

//Exports User model created
module.exports = model("User", userSchema);