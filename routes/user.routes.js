const express = require('express');
const { loginUser, registerUser, getProfile } = require("../controllers/user.controller.js");
const { verify } = require("../middleware/auth.js");


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/details", verify, getProfile);

module.exports = router;
