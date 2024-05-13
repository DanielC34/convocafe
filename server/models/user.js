//userModel keeps track of who is using the app with info like
// name, email, password and profile picture

const {Schema, model} = require('mongoose');

//Define the user schema
const userSchema = new Schema({
        username: {type: String, required: true}, //username defined as required string
        email: { type: String, required: true, unique: true }, //email defined as required string
        password: {type: String, required: true, select: false}, //password defined as required string (not selected by default)
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
        toJSON: {
            virtuals: true,
            transform: function (doc, ret) {
                // Add id field with value of _id
                ret.id = ret._id;
                // Delete _id and __v
                delete ret._id; //remove ret._id from output
                delete ret.__v; //remove ret.__v from output
                return ret; //return modified document
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