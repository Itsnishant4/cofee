const mongoose = require('mongoose');

const shippingSchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Order',
        unique: true
    },
    address: {
        type: String,
        required: [true, 'Please enter shipping address']
    },
    city: {
        type: String,
        required: [true, 'Please enter shipping city']
    },
    postalCode: {
        type: String,
        required: [true, 'Please enter shipping postal code']
    },
    country: {
        type: String,
        required: [true, 'Please enter shipping country']
    },
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    shippedAt: {
        type: Date
    },
    deliveredAt: {
        type: Date
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Shipping', shippingSchema);
