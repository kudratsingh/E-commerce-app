const User = require('../models/UserTemp');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = "your-secret-key-here";  // Hardcoded for demonstration purposes

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = new User({ name, email, password });
        await user.save();

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        console.error("Error registering user:", error.message);  // Logging the error can be helpful for debugging
        res.status(500).json({ error: error.message });  // Sending the actual error message to the client
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log("Received login data:", req.body);

    try {
        console.log("Login attempt")
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        console.log("Generated Token:", { token });
        res.status(200).json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to login" });
    }
};
