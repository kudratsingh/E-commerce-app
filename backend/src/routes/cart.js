const express = require('express');
const router = express.Router();
const { getCart, addItemToCart, updateCartItem, removeCartItem } = require('../controllers/cartController');
const { protect } = require('../middlewares/authMiddleware');  // Use the protect middleware to ensure only logged-in users can access their carts

router.route('/')
    .get(protect, (req, res, next) => {
        console.log('Accessing GET /api/cart');
        next();
    }, getCart)
    .post(protect, (req, res, next) => {
        console.log('Accessing POST /api/cart');
        next();
    }, addItemToCart);


router.route('/:itemId')
    .put(updateCartItem)
    .delete(removeCartItem);

module.exports = router;
