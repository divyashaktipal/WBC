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

// Simplified validation rules for creating/updating food items
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
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Category must be between 2 and 50 characters')
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
