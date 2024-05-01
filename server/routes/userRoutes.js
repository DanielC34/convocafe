const express = require("express");
const { registerUser, authUser, allUsers } = require("../controllers/userController");

const router = express.Router();

router.route('/').post(registerUser).get(allUsers)
router.route('/signin').post(authUser)
router.route('/').get(allUsers);

module.exports = router;