const asyncHandler = require("express-async-handler");
const Message = require("../models/Message");

// @desc    Create a new message
// @route   POST /api/messages
// @access  Public
const createMessage = asyncHandler(async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        res.status(400);
        throw new Error("Please enter all fields");
    }

    const newMessage = await Message.create({
        name,
        email,
        message,
    });

    res.status(201).json(newMessage);
});

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private/Admin
const getMessages = asyncHandler(async (req, res) => {
    const messages = await Message.find({}).sort({ createdAt: -1 });
    res.json(messages);
});

// @desc    Delete a message
// @route   DELETE /api/messages/:id
// @access  Private/Admin
const deleteMessage = asyncHandler(async (req, res) => {
    const message = await Message.findById(req.params.id);

    if (message) {
        await message.deleteOne();
        res.json({ message: "Message removed" });
    } else {
        res.status(404);
        throw new Error("Message not found");
    }
});

module.exports = {
    createMessage,
    getMessages,
    deleteMessage,
};
