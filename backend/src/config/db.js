const mongoose = require('mongoose');

const connectDB = async () => {
    try {
      const MONGO_URI = "mongodb+srv://kudratsingh:12345@cluster1.knyyhc7.mongodb.net/?retryWrites=true&w=majority"; // Replace with your MongoDB connection string
      await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB connected...');
    } catch (err) {
      console.error(err.message);
      // Exit process with failure
      process.exit(1);
    }
  };
  
module.exports = connectDB;
