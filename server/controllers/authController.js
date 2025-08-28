const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

// @desc    Register new user
// @route   POST http://localhost:5000/api/auth/signup
// @access  Public
const signup = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please enter all fields");
    }

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

// @desc    Authenticate user & get token
// @route   POST http://localhost:5000/api/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Please enter all fields");
    }
    // Check for user email
    const user = await User.findOne({ email });

    if (!user) {
        res.status(400);
        throw new Error("Invalid credentials");
    }

    if (!password || password.length < 6) {
        res.status(400);
        throw new Error("Password must be at least 6 characters");
    }

    // Explicitly select password field for comparison
    const userWithPassword = await User.findOne({ email }).select('+password');
    if (!userWithPassword) {
        res.status(400);
        throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, userWithPassword.password);
    if (isMatch) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid credentials");
    }
});

// @desc    Forgot Password
// @route   POST http://localhost:5000/api/auth/forgot-password
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    // Generate a reset token (for simplicity, not implementing actual email sending)
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });

    // In a real application, you would save this token to the user and send an email
    console.log(`Password reset token for ${user.email}: ${resetToken}`);

    res.status(200).json({ message: "Password reset link sent to your email (check console for token)" });
});

// @desc    Reset Password
// @route   POST http://localhost:5000/api/auth/reset-password
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
        res.status(400);
        throw new Error("Please provide token and new password");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            res.status(404);
            throw new Error("Invalid or expired token");
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        res.status(401);
        throw new Error("Invalid or expired token");
    }
});


// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

module.exports = {
    signup,
    login,
    forgotPassword,
    resetPassword,
};
