const FoodItem = require('../models/FoodItem');
const User = require('../models/User');
const { validationResult } = require('express-validator');

// @desc    Get all food items
// @route   GET /api/food-items
// @access  Public
const getFoodItems = async (req, res) => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      search,
      isVegetarian,
      isVegan,
      isGlutenFree,
      isDairyFree,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 10
    } = req.query;

    // Build filter object
    const filter = { isActive: true, 'availability.isAvailable': true };

    if (category) {
      filter.category = category;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    if (search) {
      filter.$text = { $search: search };
    }

    if (isVegetarian === 'true') {
      filter['dietaryInfo.isVegetarian'] = true;
    }

    if (isVegan === 'true') {
      filter['dietaryInfo.isVegan'] = true;
    }

    if (isGlutenFree === 'true') {
      filter['dietaryInfo.isGlutenFree'] = true;
    }

    if (isDairyFree === 'true') {
      filter['dietaryInfo.isDairyFree'] = true;
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const foodItems = await FoodItem.find(filter)
      .populate('seller', 'name businessName profileImage')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await FoodItem.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: foodItems.length,
      total,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      },
      data: foodItems
    });
  } catch (error) {
    console.error('Get food items error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching food items'
    });
  }
};

// @desc    Get single food item
// @route   GET /api/food-items/:id
// @access  Public
const getFoodItem = async (req, res) => {
  try {
    const foodItem = await FoodItem.findById(req.params.id)
      .populate('seller', 'name businessName profileImage businessDescription')
      .populate('reviews.user', 'name profileImage');

    if (!foodItem) {
      return res.status(404).json({
        success: false,
        message: 'Food item not found'
      });
    }

    res.status(200).json({
      success: true,
      data: foodItem
    });
  } catch (error) {
    console.error('Get food item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching food item'
    });
  }
};

// @desc    Create new food item
// @route   POST /api/food-items
// @access  Private (Seller only)
const createFoodItem = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const foodItemData = {
      ...req.body,
      seller: req.user.id,
      isHomemade: true // Force all items to be homemade
    };

    // Ensure homemade details are provided
    if (!foodItemData.homemadeDetails) {
      foodItemData.homemadeDetails = {
        preparationMethod: 'home-cooked',
        ingredientsSource: 'fresh-local',
        preparationTime: 'same-day'
      };
    }

    const foodItem = await FoodItem.create(foodItemData);

    // Populate seller information
    await foodItem.populate('seller', 'name businessName profileImage');

    res.status(201).json({
      success: true,
      message: 'Food item created successfully',
      data: foodItem
    });
  } catch (error) {
    console.error('Create food item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating food item'
    });
  }
};

// @desc    Update food item
// @route   PUT /api/food-items/:id
// @access  Private (Seller only)
const updateFoodItem = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    let foodItem = await FoodItem.findById(req.params.id);

    if (!foodItem) {
      return res.status(404).json({
        success: false,
        message: 'Food item not found'
      });
    }

    // Make sure user owns the food item
    if (foodItem.seller.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this food item'
      });
    }

    // Ensure updated item remains homemade
    const updateData = {
      ...req.body,
      isHomemade: true // Force all items to be homemade
    };

    foodItem = await FoodItem.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    ).populate('seller', 'name businessName profileImage');

    res.status(200).json({
      success: true,
      message: 'Food item updated successfully',
      data: foodItem
    });
  } catch (error) {
    console.error('Update food item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating food item'
    });
  }
};

// @desc    Delete food item
// @route   DELETE /api/food-items/:id
// @access  Private (Seller only)
const deleteFoodItem = async (req, res) => {
  try {
    const foodItem = await FoodItem.findById(req.params.id);

    if (!foodItem) {
      return res.status(404).json({
        success: false,
        message: 'Food item not found'
      });
    }

    // Make sure user owns the food item
    if (foodItem.seller.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this food item'
      });
    }

    // Soft delete by setting isActive to false
    foodItem.isActive = false;
    await foodItem.save();

    res.status(200).json({
      success: true,
      message: 'Food item deleted successfully'
    });
  } catch (error) {
    console.error('Delete food item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting food item'
    });
  }
};

// @desc    Get food items by seller
// @route   GET /api/food-items/seller/:sellerId
// @access  Public
const getFoodItemsBySeller = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const foodItems = await FoodItem.find({
      seller: sellerId,
      isActive: true
    })
      .populate('seller', 'name businessName profileImage')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await FoodItem.countDocuments({
      seller: sellerId,
      isActive: true
    });

    res.status(200).json({
      success: true,
      count: foodItems.length,
      total,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      },
      data: foodItems
    });
  } catch (error) {
    console.error('Get food items by seller error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching seller food items'
    });
  }
};

// @desc    Add review to food item
// @route   POST /api/food-items/:id/reviews
// @access  Private (Buyer only)
const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const foodItem = await FoodItem.findById(req.params.id);

    if (!foodItem) {
      return res.status(404).json({
        success: false,
        message: 'Food item not found'
      });
    }

    // Check if user already reviewed this item
    const existingReview = foodItem.reviews.find(
      review => review.user.toString() === req.user.id
    );

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this food item'
      });
    }

    const review = {
      user: req.user.id,
      rating,
      comment
    };

    foodItem.reviews.push(review);

    // Update average rating
    const totalRating = foodItem.reviews.reduce((sum, review) => sum + review.rating, 0);
    foodItem.rating.average = totalRating / foodItem.reviews.length;
    foodItem.rating.count = foodItem.reviews.length;

    await foodItem.save();

    // Populate the new review
    await foodItem.populate('reviews.user', 'name profileImage');

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      data: foodItem.reviews[foodItem.reviews.length - 1]
    });
  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while adding review'
    });
  }
};

module.exports = {
  getFoodItems,
  getFoodItem,
  createFoodItem,
  updateFoodItem,
  deleteFoodItem,
  getFoodItemsBySeller,
  addReview
};
