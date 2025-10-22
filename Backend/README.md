# WBC Food Marketplace Backend

A Node.js backend API for the Women Business Circle Food Marketplace application.

## Features

- **User Authentication**: Register and login for buyers and sellers
- **Food Item Management**: Sellers can create, update, and delete food items
- **Food Marketplace**: Buyers can browse and search food items
- **Reviews & Ratings**: Buyers can review and rate food items
- **User Profiles**: Separate dashboards for buyers and sellers
- **Search & Filtering**: Advanced search and filtering capabilities

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/wbc_food_marketplace
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
```

3. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password

### Food Items
- `GET /api/food-items` - Get all food items (with filters)
- `GET /api/food-items/:id` - Get single food item
- `POST /api/food-items` - Create food item (Seller only)
- `PUT /api/food-items/:id` - Update food item (Seller only)
- `DELETE /api/food-items/:id` - Delete food item (Seller only)
- `GET /api/food-items/seller/:sellerId` - Get food items by seller
- `POST /api/food-items/:id/reviews` - Add review (Buyer only)

### Users
- `GET /api/users/sellers` - Get all sellers
- `GET /api/users/sellers/:id` - Get seller profile
- `GET /api/users/seller-dashboard` - Get seller dashboard (Seller only)
- `GET /api/users/buyer-dashboard` - Get buyer dashboard (Buyer only)

## User Roles

### Buyer
- Browse and search food items
- View seller profiles
- Add reviews and ratings
- Place orders (future feature)

### Seller
- Create and manage food items
- View seller dashboard with stats
- Manage business profile
- View reviews and ratings

## Database Models

### User
- Basic user information
- Role (buyer/seller)
- Business information (for sellers)
- Preferences (for buyers)

### FoodItem
- Food item details
- Pricing and availability
- Dietary information
- Reviews and ratings
- Seller reference

### Order (Future)
- Order management
- Payment tracking
- Delivery information

## Environment Variables

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT secret key
- `JWT_EXPIRE` - JWT expiration time
- `NODE_ENV` - Environment (development/production)

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
