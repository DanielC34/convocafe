const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { signin, signup, signout,isSignedIn } = require("../controllers/authController");


// //Route for handling user sign up
router.post("/signup", [
    check("name", "Name must be 3 or more characters long").isLength({ min: 3 }),
    check("email", "Email is required").isEmail(),
    check("password", "Password must have 8 or more characters").isLength({ min: 8 }),
], signup);

// Route for user sign in
router.post("/signin", [
  check("email", "Email is required").isEmail(),
  check("password", "Password is required").isLength({
    min: 1,
  }),
], signin);

//Route for user signout
router.get("/signout", signout);

//Protected Route for testing
router.get("/testroute", isSignedIn, (req, res) => {
    res.send("This is a protected route")
});

 module.exports = router;