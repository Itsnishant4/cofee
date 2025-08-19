const express = require("express");
const router = express.Router();
const {
    createMessage,
    getMessages,
    deleteMessage,
} = require("../controllers/messageController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.route("/").post(createMessage).get(protect, authorize("admin"), getMessages);
router.route("/:id").delete(protect, authorize("admin"), deleteMessage);

module.exports = router;
