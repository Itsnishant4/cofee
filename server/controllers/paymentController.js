const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// @desc    Process Stripe payment
// @route   POST /api/payment/process
// @access  Private
const processPayment = asyncHandler(async (req, res) => {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100, // Stripe expects amount in cents
        currency: "usd",
        metadata: { integration_check: "accept_a_payment" },
    });

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret,
    });
});

module.exports = { processPayment };
