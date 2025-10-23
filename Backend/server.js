const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./src/config/config.js');
const dotenv = require('dotenv');
dotenv.config();
// Import routes
const authRoutes = require('./src/routes/auth');
const foodItemRoutes = require('./src/routes/foodItems');
const userRoutes = require('./src/routes/users');

const app = express();
const PORT = config.PORT;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(config.MONGODB_URI, config.MONGODB_OPTIONS)
.then(() => {
  console.log('✅ Connected to MongoDB successfully!');
  console.log(`📊 Database: ${config.MONGODB_URI}`);
  console.log(`🌐 Environment: ${config.NODE_ENV}`);
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  console.log('💡 Make sure MongoDB is running on your system');
  console.log('💡 Check if MongoDB service is started: net start MongoDB');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/food-items', foodItemRoutes);
app.use('/api/users', userRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ message: 'WBC Food Marketplace API is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
