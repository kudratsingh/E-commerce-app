const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');

const app = express();

app.use(cors()); 
app.use(express.json());

// Connect Database
connectDB();

//routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Middleware to handle errors
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Server error');
// });

// ... rest of the server setup ...

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
