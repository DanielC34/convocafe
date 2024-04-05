//userModel keeps track of who is using the app with info like
// name, email, password and profile picture

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Define the user schema
const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: {
        type: String,
        default:
            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    isAdmin : { type: Boolean, default:false},
},
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

userSchema.methods.passwordMatch = async function (inputPassword) {
    return await bcrypt.compare(inputPassword, this.password)
}

userSchema.pre("save", async function (next) {
    if (!this.isModified) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

//Creates a User model based on the schema
const User = mongoose.model("User", userSchema);

//Exports User model created
module.exports = User;