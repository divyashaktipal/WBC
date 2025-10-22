# Women Business Circle - Food Marketplace

A full-stack web application that connects women entrepreneurs in the food industry with customers, creating a supportive community marketplace.

## 🌟 Features

### For Buyers
- Browse and search **homemade food items** from local women entrepreneurs
- Filter by category, dietary restrictions, and price range
- View detailed food item information with reviews and ratings
- Discover top-rated sellers and their profiles
- See homemade preparation details and ingredient sources
- Add items to cart and place orders (future feature)

### For Sellers
- Create and manage **homemade food item listings only**
- Upload multiple images for each item
- Set pricing, availability, and dietary information
- Specify homemade preparation details (method, ingredients source, timing)
- Track sales and customer reviews
- Manage business profile and information
- **Platform restriction: Only homemade items allowed (no commercial/market items)**

### General Features
- User authentication with role-based access (Buyer/Seller)
- Responsive design for all devices
- Real-time search and filtering
- Review and rating system
- Professional dashboard for both user types

## 🛠️ Tech Stack

### Frontend
- **React** - UI framework
- **React Router** - Navigation
- **CSS3** - Styling with modern features
- **JavaScript ES6+** - Modern JavaScript features

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

## 📁 Project Structure

```
WBC/
├── Frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   └── Navbar.css
│   │   ├── pages/          # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── AboutUs.jsx
│   │   │   ├── ContactUs.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── SellerDashboard.jsx
│   │   │   ├── BuyerDashboard.jsx
│   │   │   └── *.css
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   ├── package.json
│   └── vite.config.js
├── Backend/                 # Node.js backend API
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   └── config/         # Configuration
│   ├── server.js          # Main server file
│   ├── config.js          # App configuration
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd WBC
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd Frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../Backend
   npm install
   ```

4. **Set up MongoDB**
   - Install MongoDB locally or use MongoDB Atlas
   - The app will connect to `mongodb://localhost:27017/wbc_food_marketplace` by default

5. **Start the Backend Server**
   ```bash
   cd Backend
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

6. **Start the Frontend Development Server**
   ```bash
   cd Frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

## 📱 Usage

### Registration & Login
1. Visit the login page
2. Choose "Sign Up" to create a new account
3. Select your role: **Buyer** or **Seller**
4. Fill in the required information
5. For sellers, provide business name and description
6. Complete registration and login

### For Sellers
1. Access the **Seller Dashboard** after login
2. Click "Add New Homemade Item" to create listings
3. Fill in item details including homemade preparation information
4. Specify preparation method, ingredients source, and timing
5. Upload images, set pricing, and manage inventory
6. Track sales and respond to customer reviews
7. **Remember: Only homemade items are allowed on this platform**

### For Buyers
1. Access the **Buyer Dashboard** after login
2. Browse featured food items
3. Use search and filters to find specific items
4. View seller profiles and ratings
5. Add items to cart (future feature)

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

### Food Items
- `GET /api/food-items` - Get all food items (with filters)
- `GET /api/food-items/:id` - Get single food item
- `POST /api/food-items` - Create food item (Seller only)
- `PUT /api/food-items/:id` - Update food item (Seller only)
- `DELETE /api/food-items/:id` - Delete food item (Seller only)

### Users
- `GET /api/users/sellers` - Get all sellers
- `GET /api/users/sellers/:id` - Get seller profile
- `GET /api/users/seller-dashboard` - Get seller dashboard
- `GET /api/users/buyer-dashboard` - Get buyer dashboard

## 🎨 Design Features

- **Modern UI/UX** - Clean, professional design
- **Responsive Layout** - Works on desktop, tablet, and mobile
- **Golden Theme** - Elegant black and gold color scheme
- **Smooth Animations** - Hover effects and transitions
- **Accessibility** - Semantic HTML and keyboard navigation

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- Role-based access control
- Protected routes and middleware

## 🏠 Homemade Items Policy

This platform is exclusively designed for **homemade food items only**. We enforce strict policies to ensure quality and authenticity:

### ✅ Allowed Items
- Food prepared in home kitchens
- Items made with fresh, quality ingredients
- Traditional and family recipes
- Artisan and handmade creations
- Items prepared with love and care

### ❌ Not Allowed
- Commercially produced items
- Mass-manufactured products
- Pre-packaged store-bought items
- Items not prepared by the seller
- Non-food items

### 🔍 Quality Assurance
- All items are marked as homemade in the database
- Sellers must specify preparation methods and ingredient sources
- Platform automatically enforces homemade-only policy
- Community reviews help maintain quality standards

## 🚧 Future Enhancements

- Order management system
- Payment integration
- Real-time notifications
- Advanced search with AI
- Mobile app development
- Multi-language support
- Analytics dashboard
- Social features and reviews

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👥 Support

For support and questions, please contact the development team or create an issue in the repository.

---

**Built with ❤️ for Women Business Circle**
