const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch products." });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: "Product not found." });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching the product." });
    }
};

exports.addProduct = async (req, res) => {
    const product = new Product(req.body);
    try {
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: "Failed to add product" });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }  // This option returns the updated document
        );
        
        if (updatedProduct) {
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).json({ message: "Product not found." });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to update product." });
    }
};

exports.deleteProduct = async (req, res) => {
    console.log("Attempting to delete product with ID:", req.params.id);

    // ... your delete logic ...

    try {
        // Assuming you're using Mongoose:
        const result = await Product.findByIdAndDelete(req.params.id);
        console.log("Delete result:", result);

        if (!result) {
            console.log("Product not found");
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Failed to delete product." });
    }
};
