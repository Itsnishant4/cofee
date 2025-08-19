const express = require("express");
const router = express.Router();
const {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    getUserOrders,
} = require("../controllers/orderController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.route("/").get(protect, authorize("admin"), getOrders).post(protect, createOrder);
router.route("/myorders").get(protect, getUserOrders);
router
    .route("/:id")
    .get(protect, getOrderById)
    .put(protect, authorize("admin"), updateOrder)
    .delete(protect, authorize("admin"), deleteOrder);

module.exports = router;
