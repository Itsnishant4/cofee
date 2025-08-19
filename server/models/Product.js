const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true,
        maxlength: [100, 'Product name cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please enter product description'],
        maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price'],
        maxlength: [8, 'Price cannot exceed 8 figures'],
        default: 0
    },
    category: {
        type: String,
        required: [true, 'Please enter product category'],
        enum: {
            values: [
                'Espresso',
                'Americano',
                'Latte',
                'Cappuccino',
                'Mocha',
                'Tea',
                'Pastry',
                'Sandwich',
                'Dessert',
                'Other'
            ],
            message: 'Please select correct category'
        }
    },
    image: {
        type: String,
        required: [true, 'Please enter product image URL']
    },
    stock: {
        type: Number,
        required: [true, 'Please enter product stock'],
        maxlength: [5, 'Stock cannot exceed 5 figures'],
        default: 0
    },
    rating: {
        type: Number,
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);
