//userModel keeps track of who is using the app with info like
// name, email, password and profile picture

const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

//Define the user schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, maxLength:30, minLength: 2, },
    email: { type: String, required: true, unique: true },
    encrypted_password: { type: String, required: true },
    salt: String,
},
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);
//Creates virtual field "password" to handle encryption
userSchema.virtual("password").set((password) => {
    this._password = password;
    this.salt = uuidv4();
    this.encrypted_password = this.securePassword(password);
}).get(() => {
    return this._password;
});

//Define methods associated with the user schema
userSchema.method({
    //Checks if the password is correct
    authenticate: (plainpassword) => {
        return this.securedPassword(plainpassword) === this.encrypted_password;
    },
    //Encrypt the password
    securedPassword: (plainpassword) => {
        if (!plainpassword)
            return "";
        try {
            return crypto.createHmac('sha256', this.salt).update(plainpassword).digest("hex");
        } catch (err) {
            return "Error in hashing password"
        }
    }
});

//Creates a User model based on the schema
const User = mongoose.model("User", userSchema);

//Exports User model created
module.exports = User;