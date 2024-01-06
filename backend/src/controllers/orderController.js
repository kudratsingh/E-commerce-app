const Order = require('../models/Order');
const Product = require('../models/Product');  // Might be required for some operations
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);


exports.createCheckoutSession = async (req, res) => {
    try {
        console.log(req.body);
        const items = req.body.items; // Extract cart items from the request body

        // Convert cart items to Stripe's format, calculate price, etc.
        const lineItems = items.map(item => {
            return {
                // Example structure, adjust based on your Product model
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.product.name,
                    },
                    unit_amount: item.product.price * 100, // Stripe expects the amount in cents
                },
                quantity: item.quantity,
            };
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.origin}/cancel`,
        });

        res.json({ url: session.url });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).send('Error creating checkout session');
    }
};


exports.createOrder = async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
        return;
    }

    const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
};

exports.getOrderById = async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
};

exports.getUserOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
};

exports.updateOrderToPaid = async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address
        };

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
};

exports.getAllOrders = async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
};

exports.updateOrderToDelivered = async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
};


