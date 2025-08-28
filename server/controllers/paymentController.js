const asyncHandler = require("express-async-handler");
// Stripe removed - using mock payment processing
const mockPayment = () => Promise.resolve({ paymentIntent: { client_secret: 'mock_secret' } });

// @desc    Process mock payment
// @route   POST /api/payment/process
// @access  Private
const processPayment = asyncHandler(async (req, res) => {
    const { amount } = req.body;
    res.status(200).json({
        success: true,
        message: 'Payment processed successfully',
        amount: amount
    });
});

module.exports = { processPayment };
