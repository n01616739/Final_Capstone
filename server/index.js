const express = require('express');
const cors = require('cors');
const app = express();

// CORS Middleware
app.use(cors({
  origin: 'http://localhost:3000', // React app URL
  credentials: true, // Allow cookies
}));

// Other middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const authRoutes = require('../server/routes/auth'); // Adjust path if necessary
app.use('/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
