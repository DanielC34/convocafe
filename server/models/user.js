//userModel keeps track of who is using the app with info like
// name, email, password and profile picture

const {Schema, model } = require('mongoose');

//Define the user schema
const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
},
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

//Exports User model created
module.exports = model("User", userSchema);