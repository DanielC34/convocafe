const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async(req, res) => {
    const { name, email, password, profilePicture } = req.body;

    //Checks if any of the fields is empty and returns error if true
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please fill in all fields");
    }

    //Checks if user exists in database by email
    const userExists = await User.findOne({ email });

    //Resulting error shown if user exists in database
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

        //Otherwise, a new user is created. 
        const user = await User.create({
            name,
            email,
            password,
            profilePicture,
        });
    
    //Success message returned when new user is successfully created
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profilePicture: user.profilePicture,
            token:generateToken(user._id)
        });
    } else { //if this fails it returns an error
        res.send(400);
        throw new Error("Failed to create new user");
    }
});

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    //Find user by email in database
    const user = await User.findOne({ email });

    // If user exists and password matches, return user details and token
    if (user && (await user.passwordMatch(password))) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profilePicture: user.profilePicture,
            token: generateToken(user._id),
        });
    } else { //Returns an error if authentication fails
        res.status(400);
        throw new Error("Failed to create user");
    }
});

const allUsers = asyncHandler(async (req, res) => {
  // Extracting the search keyword from the query parameters
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  // Finding all users based on the keyword and excluding the current user
  const users = await User.find({ ...keyword, _id: { $ne: req.user._id } });

  // Sending the found users as the response
  res.send(users);
});

module.exports = { registerUser, authUser, allUsers };