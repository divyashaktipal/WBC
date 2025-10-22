const express = require('express');
const { body } = require('express-validator');
const {
  getFoodItems,
  getFoodItem,
  createFoodItem,
  updateFoodItem,
  deleteFoodItem,
  getFoodItemsBySeller,
  addReview
} = require('../controllers/foodItemController');
const { protect, isSeller, isBuyer } = require('../middleware/auth');

const router = express.Router();

// Validation rules for creating/updating food items
const foodItemValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Description must be between 10 and 500 characters'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('category')
    .isIn([
      'appetizers',
      'main-courses',
      'desserts',
      'beverages',
      'snacks',
      'salads',
      'soups',
      'breakfast',
      'lunch',
      'dinner',
      'vegetarian',
      'vegan',
      'gluten-free',
      'dairy-free',
      'other'
    ])
    .withMessage('Invalid category'),
  body('images')
    .isArray({ min: 1 })
    .withMessage('At least one image is required'),
  body('preparationTime')
    .isInt({ min: 1 })
    .withMessage('Preparation time must be a positive integer (in minutes)'),
  body('isHomemade')
    .optional()
    .isBoolean()
    .withMessage('isHomemade must be a boolean'),
  body('homemadeDetails.preparationMethod')
    .optional()
    .isIn(['handmade', 'home-cooked', 'artisan', 'traditional-recipe', 'family-recipe'])
    .withMessage('Invalid preparation method'),
  body('homemadeDetails.ingredientsSource')
    .optional()
    .isIn(['fresh-local', 'organic', 'homegrown', 'traditional', 'premium-quality'])
    .withMessage('Invalid ingredients source'),
  body('homemadeDetails.preparationTime')
    .optional()
    .isIn(['same-day', '24-hours', '2-3-days', 'weekly-batch'])
    .withMessage('Invalid preparation time'),
  body('availability.quantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Quantity must be a non-negative integer'),
  body('availability.maxOrderQuantity')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Max order quantity must be a positive integer')
];

// Validation rules for reviews
const reviewValidation = [
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('comment')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Comment cannot exceed 500 characters')
];

// Public routes
router.get('/', getFoodItems);
router.get('/seller/:sellerId', getFoodItemsBySeller);
router.get('/:id', getFoodItem);

// Protected routes
router.post('/', protect, isSeller, foodItemValidation, createFoodItem);
router.put('/:id', protect, isSeller, foodItemValidation, updateFoodItem);
router.delete('/:id', protect, isSeller, deleteFoodItem);
router.post('/:id/reviews', protect, isBuyer, reviewValidation, addReview);

module.exports = router;
