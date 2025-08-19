const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: [true, 'Please enter coupon code'],
        unique: true,
        trim: true,
        uppercase: true,
        minlength: [4, 'Coupon code must be at least 4 characters'],
        maxlength: [12, 'Coupon code cannot exceed 12 characters']
    },
    discount: {
        type: Number,
        required: [true, 'Please enter discount percentage'],
        min: 1,
        max: 99
    },
    expiryDate: {
        type: Date,
        required: [true, 'Please enter expiry date']
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Coupon', couponSchema);
