const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Food item name is required'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  isHomemade: {
    type: Boolean,
    default: true,
    required: [true, 'Must specify if item is homemade']
  },
  homemadeDetails: {
    preparationMethod: {
      type: String,
      required: function() {
        return this.isHomemade === true;
      },
      enum: ['handmade', 'home-cooked', 'artisan', 'traditional-recipe', 'family-recipe'],
      default: 'home-cooked'
    },
    ingredientsSource: {
      type: String,
      required: function() {
        return this.isHomemade === true;
      },
      enum: ['fresh-local', 'organic', 'homegrown', 'traditional', 'premium-quality'],
      default: 'fresh-local'
    },
    preparationTime: {
      type: String,
      required: function() {
        return this.isHomemade === true;
      },
      enum: ['same-day', '24-hours', '2-3-days', 'weekly-batch'],
      default: 'same-day'
    }
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
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
    ]
  },
  images: [{
    type: String,
    required: [true, 'At least one image is required']
  }],
  ingredients: [{
    type: String,
    trim: true
  }],
  allergens: [{
    type: String,
    enum: [
      'nuts',
      'dairy',
      'eggs',
      'soy',
      'wheat',
      'fish',
      'shellfish',
      'sesame',
      'none'
    ]
  }],
  dietaryInfo: {
    isVegetarian: {
      type: Boolean,
      default: false
    },
    isVegan: {
      type: Boolean,
      default: false
    },
    isGlutenFree: {
      type: Boolean,
      default: false
    },
    isDairyFree: {
      type: Boolean,
      default: false
    },
    isHalal: {
      type: Boolean,
      default: false
    },
    isKosher: {
      type: Boolean,
      default: false
    }
  },
  nutritionInfo: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    fiber: Number,
    sugar: Number,
    sodium: Number
  },
  availability: {
    isAvailable: {
      type: Boolean,
      default: true
    },
    quantity: {
      type: Number,
      default: 0,
      min: [0, 'Quantity cannot be negative']
    },
    maxOrderQuantity: {
      type: Number,
      default: 10
    }
  },
  preparationTime: {
    type: Number, // in minutes
    required: [true, 'Preparation time is required']
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Seller is required']
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      maxlength: [500, 'Review comment cannot be more than 500 characters']
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  tags: [{
    type: String,
    trim: true
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Pre-save middleware to enforce homemade items only
foodItemSchema.pre('save', function(next) {
  // Ensure all items are homemade
  if (this.isHomemade === false) {
    return next(new Error('Only homemade items are allowed on this platform'));
  }
  
  // Set isHomemade to true if not explicitly set
  if (this.isHomemade === undefined || this.isHomemade === null) {
    this.isHomemade = true;
  }
  
  next();
});

// Index for better search performance
foodItemSchema.index({ name: 'text', description: 'text', category: 'text' });
foodItemSchema.index({ seller: 1 });
foodItemSchema.index({ category: 1 });
foodItemSchema.index({ 'rating.average': -1 });
foodItemSchema.index({ isHomemade: 1 });

module.exports = mongoose.model('FoodItem', foodItemSchema);
