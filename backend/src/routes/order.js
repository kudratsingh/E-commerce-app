const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const {
    createOrder,
    getOrderById,
    getUserOrders,
    updateOrderToPaid,
    getAllOrders,
    updateOrderToDelivered
} = require('../controllers/orderController');

// Routes related to orders

// Create a new order
router.post('/', protect, createOrder);

// Get a specific order by ID
router.get('/:id', protect, getOrderById);

// Get all orders for a logged-in user
router.get('/myorders', protect, getUserOrders);

// Update order status to paid
router.put('/:id/pay', protect, updateOrderToPaid);

// Get all orders (admin route)
router.get('/', protect, getAllOrders);

// Update order status to delivered (admin route)
router.put('/:id/deliver', protect, updateOrderToDelivered);

module.exports = router;
