const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'  // Assuming your product model name is 'Product'
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    price: {
        type: Number,
        required: true
    }
});

const CartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserTemp'  // Assuming your user model name is 'UserTemp'
    },
    items: [CartItemSchema],
    totalCost: {
        type: Number,
        default: 0
    }
});

// Middleware to calculate total cost of cart
CartSchema.pre('save', function(next) {
    this.totalCost = this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    next();
});

module.exports = mongoose.model('Cart', CartSchema);
