const mongoose = require('mongoose');
// Initialize the MongoDB connection
const initialize = async (connectionString) => {
    try {
      await mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: process.env.DB_NAME, // Dynamic database name from .env
      });
      console.log(`Connected to MongoDB database: ${process.env.DB_NAME}`);
    } catch (err) {
      console.error('Failed to connect to MongoDB Atlas:', err);
      throw err;
    }
  };
  
module.exports = { initialize };
