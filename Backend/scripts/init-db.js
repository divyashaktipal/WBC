const mongoose = require('mongoose');
const config = require('../config');

// Import models
const User = require('../src/models/User');
const FoodItem = require('../src/models/FoodItem');

// Sample data for testing
const sampleUsers = [
  {
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    password: 'password123',
    role: 'seller',
    businessName: "Sarah's Homemade Kitchen",
    businessDescription: 'Specializing in traditional family recipes and homemade baked goods',
    phone: '+1-555-0123',
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    }
  },
  {
    name: 'Maria Rodriguez',
    email: 'maria@example.com',
    password: 'password123',
    role: 'seller',
    businessName: 'Maria\'s Artisan Foods',
    businessDescription: 'Handcrafted Mexican cuisine and traditional recipes',
    phone: '+1-555-0124',
    address: {
      street: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'USA'
    }
  },
  {
    name: 'Jennifer Chen',
    email: 'jennifer@example.com',
    password: 'password123',
    role: 'buyer',
    phone: '+1-555-0125',
    address: {
      street: '789 Pine St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      country: 'USA'
    },
    preferences: {
      dietaryRestrictions: ['vegetarian'],
      favoriteCategories: ['desserts', 'snacks']
    }
  }
];

const sampleFoodItems = [
  {
    name: 'Grandma\'s Apple Pie',
    description: 'Traditional apple pie made with family recipe passed down through generations. Made with fresh local apples and homemade crust.',
    price: 15.99,
    category: 'desserts',
    isHomemade: true,
    homemadeDetails: {
      preparationMethod: 'family-recipe',
      ingredientsSource: 'fresh-local',
      preparationTime: 'same-day'
    },
    ingredients: ['apples', 'flour', 'butter', 'sugar', 'cinnamon', 'nutmeg'],
    allergens: ['gluten', 'dairy'],
    dietaryInfo: {
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false,
      isDairyFree: false
    },
    preparationTime: 45,
    availability: {
      quantity: 10,
      maxOrderQuantity: 2
    },
    images: ['apple-pie-1.jpg', 'apple-pie-2.jpg'],
    tags: ['traditional', 'family-recipe', 'dessert']
  },
  {
    name: 'Homemade Tamales',
    description: 'Authentic Mexican tamales made with traditional masa and slow-cooked pork. Wrapped in corn husks and steamed to perfection.',
    price: 12.99,
    category: 'main-courses',
    isHomemade: true,
    homemadeDetails: {
      preparationMethod: 'traditional-recipe',
      ingredientsSource: 'fresh-local',
      preparationTime: '24-hours'
    },
    ingredients: ['corn masa', 'pork', 'chili peppers', 'corn husks', 'garlic', 'onions'],
    allergens: ['gluten'],
    dietaryInfo: {
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      isDairyFree: true
    },
    preparationTime: 120,
    availability: {
      quantity: 20,
      maxOrderQuantity: 6
    },
    images: ['tamales-1.jpg', 'tamales-2.jpg'],
    tags: ['mexican', 'traditional', 'authentic']
  },
  {
    name: 'Artisan Sourdough Bread',
    description: 'Handcrafted sourdough bread made with natural starter and organic flour. Perfect crust and tangy flavor.',
    price: 8.99,
    category: 'other',
    isHomemade: true,
    homemadeDetails: {
      preparationMethod: 'artisan',
      ingredientsSource: 'organic',
      preparationTime: '24-hours'
    },
    ingredients: ['organic flour', 'water', 'salt', 'sourdough starter'],
    allergens: ['gluten'],
    dietaryInfo: {
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: false,
      isDairyFree: true
    },
    preparationTime: 180,
    availability: {
      quantity: 15,
      maxOrderQuantity: 3
    },
    images: ['sourdough-1.jpg', 'sourdough-2.jpg'],
    tags: ['artisan', 'organic', 'sourdough']
  }
];

async function initializeDatabase() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(config.MONGODB_URI, config.MONGODB_OPTIONS);
    console.log('✅ Connected to MongoDB successfully!');

    // Clear existing data (optional - remove this in production)
    console.log('🗑️ Clearing existing data...');
    await User.deleteMany({});
    await FoodItem.deleteMany({});
    console.log('✅ Existing data cleared');

    // Create sample users
    console.log('👥 Creating sample users...');
    const createdUsers = await User.create(sampleUsers);
    console.log(`✅ Created ${createdUsers.length} users`);

    // Create sample food items (assign to sellers)
    console.log('🍽️ Creating sample food items...');
    const sellers = createdUsers.filter(user => user.role === 'seller');
    
    const foodItemsWithSellers = sampleFoodItems.map((item, index) => ({
      ...item,
      seller: sellers[index % sellers.length]._id
    }));

    const createdFoodItems = await FoodItem.create(foodItemsWithSellers);
    console.log(`✅ Created ${createdFoodItems.length} food items`);

    console.log('\n🎉 Database initialization completed successfully!');
    console.log('\n📊 Sample Data Created:');
    console.log(`   👥 Users: ${createdUsers.length}`);
    console.log(`   🍽️ Food Items: ${createdFoodItems.length}`);
    console.log('\n🔗 You can now:');
    console.log('   1. Connect MongoDB Compass to: mongodb://localhost:27017');
    console.log('   2. Browse the "wbc_food_marketplace" database');
    console.log('   3. Start the backend server: npm run dev');
    console.log('   4. Test the application with sample data');

  } catch (error) {
    console.error('❌ Database initialization failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the initialization
initializeDatabase();
