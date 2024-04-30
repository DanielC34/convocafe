//userModel keeps track of who is using the app with info like
// name, email, password and profile picture

const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

//Define the user schema
const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 30,
      minLength: 2,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    encrypted_password: {
      type: String,
      required: true,
    },
    salt: String,
  },
  { timestamps: true }
);
//Creating a "virtual" field that will take in password and encrypt it
userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();
    this.encrypted_password = this.securedPassword(password);
  })
  .get(function () {
    return this._password;
  });
//Defining some methods associated with user schema
userSchema.method({
  //To check if the password is correct
  authenticate: function (plainpassword) {
    return this.securedPassword(plainpassword) === this.encrypted_password;
  },

  //To encrypt the password
  securedPassword: function (plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "Error in hashing the password";
    }
  },
})


//Creates a User model based on the schema
const User = mongoose.model("User", userSchema);

//Exports User model created
module.exports = User;