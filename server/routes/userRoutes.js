const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { registerUser, authUser, allUsers } = require("../controllers/userController");

const router = express.Router();

router.post("/signup", registerUser);
router.get('/users',protect, allUsers)
router.post("/signin", authUser);


module.exports = router;