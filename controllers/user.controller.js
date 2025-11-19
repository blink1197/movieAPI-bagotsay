
const bcrypt = require('bcryptjs');
const { createAccessToken } = require("../middleware/auth.js");
const User = require("../models/user.model.js");
const AppError = require("../utils/AppError.js");


module.exports.registerUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Input validation
        if (!email || !password) throw new AppError("Missing required fields", 400);

        // Check if email exists
        const existingUser = await User.findOne({ email });
        if (existingUser) throw new AppError("Email already registered", 409);

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        await User.create({
            email,
            password: hashedPassword,
        });

        res.status(201).json({ message: "Registered Successfully" });

    } catch (error) {
        next(error);
    }
}

module.exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Input validation
        if (!email || !password) throw new AppError("Missing required fields", 400);

        // Check if email exists
        const user = await User.findOne({ email });
        if (!user) throw new AppError("Email not found", 404);

        // Check if passwords match
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new AppError("Email and password does not match", 401);

        // Send access token
        const token = createAccessToken(user);
        res.status(200).json({ access: token })

    } catch (error) {
        next(error);
    }
}

module.exports.getProfile = async (req, res, next) => {
    try {
        // Fetch user info from db
        const user = await User.findById(req.user.id).select("-password");
        if (!user) throw new AppError("User not found", 404)

        // Send user details
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};
