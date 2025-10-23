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
      default: 'home-cooked-vegetarian'
    },
    ingredientsSource: {
      type: String,
      default: 'fresh-local-vegetables'
    },
    preparationTime: {
      type: String,
      default: 'same-day-vegetarian'
    },
    vegetarianCookingTechnique: {
      type: String,
      default: 'traditional-vegetarian-cooking'
    },
    spiceLevel: {
      type: String,
      default: 'medium-vegetarian'
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
    required: [true, 'Category is required']
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
    type: String
  }],
  dietaryInfo: {
    isVegetarian: {
      type: Boolean,
      default: true,
      required: [true, 'All items must be vegetarian']
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
    },
    vegetarianType: {
      type: String,
      default: 'pure-vegetarian'
    },
    cookingStyle: {
      type: String,
      default: 'traditional-vegetarian'
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

// Pre-save middleware to enforce vegetarian homemade items only
foodItemSchema.pre('save', function(next) {
  // Ensure all items are homemade
  if (this.isHomemade === false) {
    return next(new Error('Only homemade items are allowed on this platform'));
  }
  
  // Set isHomemade to true if not explicitly set
  if (this.isHomemade === undefined || this.isHomemade === null) {
    this.isHomemade = true;
  }
  
  // Ensure all items are vegetarian
  if (this.dietaryInfo && this.dietaryInfo.isVegetarian === false) {
    return next(new Error('Only vegetarian items are allowed on this platform'));
  }
  
  // Set isVegetarian to true if not explicitly set
  if (this.dietaryInfo && (this.dietaryInfo.isVegetarian === undefined || this.dietaryInfo.isVegetarian === null)) {
    this.dietaryInfo.isVegetarian = true;
  }
  
  next();
});

// Index for better search performance
foodItemSchema.index({ name: 'text', description: 'text', category: 'text' });
foodItemSchema.index({ seller: 1 });
foodItemSchema.index({ category: 1 });
foodItemSchema.index({ 'rating.average': -1 });
foodItemSchema.index({ isHomemade: 1 });
foodItemSchema.index({ 'dietaryInfo.isVegetarian': 1 });
foodItemSchema.index({ 'dietaryInfo.vegetarianType': 1 });
foodItemSchema.index({ 'dietaryInfo.cookingStyle': 1 });

module.exports = mongoose.model('FoodItem', foodItemSchema);
