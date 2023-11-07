const Cart = require('../models/Cart');
const Product = require('../models/Product');


exports.getCart = async (req, res) => {
    console.log('Entering getCart controller');
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
        console.log("Backend Cart Data:", cart);
        res.status(200).json(cart || { message: 'Your cart is empty' });  // Send a message if the cart is null or undefined
    } catch (error) {
        console.error("Backend Error:", error);
        res.status(500).send('Server error');
    }
};

exports.addItemToCart = async (req, res) => {

    console.log('Entering addItemToCart controller');

    try {
        const { productId, quantity } = req.body;
        const product = await Product.findById(productId);
        console.log('Fetched product:', product);

        // Check if product exists
        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }

        let cart = await Cart.findOne({ user: req.user.id });

        // If cart doesn't exist for the user, create a new cart
        if (!cart) {
            cart = new Cart({ user: req.user.id });
        }
        console.log('Fetched or created cart:', cart);

        let addedProduct; // To keep track of the added product

        // Check if the product is already in the cart
        const itemExists = cart.items.some(item => {
            console.log('Item:', item);
            console.log('Item product id:', item.product._id);
            console.log('Product id:', productId._id);
            console.log(productId)
            return item.product._id.equals(productId);
        });
        
        console.log('Item exists:', itemExists);

        if (itemExists) {
            // Update the quantity of the product in the cart
            cart.items = cart.items.map(item => {
                if (item.product._id.toString() === productId.toString()) {
                    addedProduct = { ...item._doc, quantity: item.quantity + quantity };
                    console.log("Item quantity:", item.quantity);
                    console.log("Quantity from request:", quantity);
                    console.log("Resulting quantity:", item.quantity + quantity);

                    return addedProduct;
                }
                return item;
            });
        } else {
            // Add the new product to the cart
            addedProduct = { product: productId, quantity, price: product.price };
            cart.items.push(addedProduct);
        }
        

        await cart.save();
        console.log('Saved cart:', cart);
        
        res.json(cart); // Return only the added product details

    } catch (error) {
        console.error("Error while adding item to cart:", error);
        res.status(500).send('Server error');
    }
};


exports.updateCartItem = async (req, res) => {
    try {
        const { quantity } = req.body;
        const cart = await Cart.findOne({ user: req.user.id });
        const itemIndex = cart.items.findIndex(item => item.id === req.params.itemId);

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity = quantity;
            await cart.save();
            res.json(cart);
        } else {
            res.status(404).json({ msg: 'Item not found in cart' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
};

exports.removeCartItem = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });
        cart.items = cart.items.filter(item => item.id !== req.params.itemId);
        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).send('Server error');
    }
};
