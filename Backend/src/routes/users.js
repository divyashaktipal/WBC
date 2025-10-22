const express = require('express');
const User = require('../models/User');
const FoodItem = require('../models/FoodItem');
const { protect, isSeller } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all sellers
// @route   GET /api/users/sellers
// @access  Public
const getSellers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const filter = { role: 'seller', isActive: true };
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { businessName: { $regex: search, $options: 'i' } }
      ];
    }

    const sellers = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: sellers.length,
      total,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      },
      data: sellers
    });
  } catch (error) {
    console.error('Get sellers error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching sellers'
    });
  }
};

// @desc    Get seller profile with stats
// @route   GET /api/users/sellers/:id
// @access  Public
const getSellerProfile = async (req, res) => {
  try {
    const seller = await User.findById(req.params.id)
      .select('-password');

    if (!seller || seller.role !== 'seller') {
      return res.status(404).json({
        success: false,
        message: 'Seller not found'
      });
    }

    // Get seller's food items count
    const foodItemsCount = await FoodItem.countDocuments({
      seller: req.params.id,
      isActive: true
    });

    // Get average rating of seller's food items
    const foodItems = await FoodItem.find({
      seller: req.params.id,
      isActive: true
    }).select('rating');

    const totalRating = foodItems.reduce((sum, item) => sum + item.rating.average, 0);
    const averageRating = foodItems.length > 0 ? totalRating / foodItems.length : 0;

    res.status(200).json({
      success: true,
      data: {
        ...seller.toObject(),
        stats: {
          foodItemsCount,
          averageRating: Math.round(averageRating * 10) / 10,
          totalReviews: foodItems.reduce((sum, item) => sum + item.rating.count, 0)
        }
      }
    });
  } catch (error) {
    console.error('Get seller profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching seller profile'
    });
  }
};

// @desc    Get seller dashboard stats
// @route   GET /api/users/seller-dashboard
// @access  Private (Seller only)
const getSellerDashboard = async (req, res) => {
  try {
    const sellerId = req.user.id;

    // Get total food items
    const totalFoodItems = await FoodItem.countDocuments({
      seller: sellerId,
      isActive: true
    });

    // Get available food items
    const availableFoodItems = await FoodItem.countDocuments({
      seller: sellerId,
      isActive: true,
      'availability.isAvailable': true
    });

    // Get average rating
    const foodItems = await FoodItem.find({
      seller: sellerId,
      isActive: true
    }).select('rating');

    const totalRating = foodItems.reduce((sum, item) => sum + item.rating.average, 0);
    const averageRating = foodItems.length > 0 ? totalRating / foodItems.length : 0;

    // Get total reviews
    const totalReviews = foodItems.reduce((sum, item) => sum + item.rating.count, 0);

    // Get recent food items
    const recentFoodItems = await FoodItem.find({
      seller: sellerId,
      isActive: true
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name price category rating images createdAt');

    res.status(200).json({
      success: true,
      data: {
        stats: {
          totalFoodItems,
          availableFoodItems,
          averageRating: Math.round(averageRating * 10) / 10,
          totalReviews
        },
        recentFoodItems
      }
    });
  } catch (error) {
    console.error('Get seller dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching seller dashboard'
    });
  }
};

// @desc    Get buyer dashboard stats
// @route   GET /api/users/buyer-dashboard
// @access  Private (Buyer only)
const getBuyerDashboard = async (req, res) => {
  try {
    // This would typically include order history, favorite sellers, etc.
    // For now, we'll return basic user info
    const user = await User.findById(req.user.id).select('-password');

    res.status(200).json({
      success: true,
      data: {
        user,
        stats: {
          totalOrders: 0, // Would be calculated from orders
          favoriteSellers: 0, // Would be calculated from user preferences
          totalSpent: 0 // Would be calculated from order history
        }
      }
    });
  } catch (error) {
    console.error('Get buyer dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching buyer dashboard'
    });
  }
};

// Routes
router.get('/sellers', getSellers);
router.get('/sellers/:id', getSellerProfile);
router.get('/seller-dashboard', protect, isSeller, getSellerDashboard);
router.get('/buyer-dashboard', protect, getBuyerDashboard);

module.exports = router;
