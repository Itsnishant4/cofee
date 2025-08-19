const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
        unique: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    lowStockAlert: {
        type: Number,
        required: true,
        min: 0,
        default: 10
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

// Update lastUpdated timestamp on quantity change
inventorySchema.pre('save', function (next) {
    if (this.isModified('quantity')) {
        this.lastUpdated = Date.now();
    }
    next();
});

module.exports = mongoose.model('Inventory', inventorySchema);
