# 🚀 Quick Setup Guide

## Prerequisites
- Node.js installed
- MongoDB installed and running

## Step-by-Step Setup

### 1. Install MongoDB
- Download from: https://www.mongodb.com/try/download/community
- Install with "Install as Service" option checked

### 2. Start MongoDB Service
```cmd
# Run as Administrator
net start MongoDB
```

### 3. Install Dependencies
```bash
cd Backend
npm install
```

### 4. Initialize Database (Optional - Creates Sample Data)
```bash
npm run init-db
```

### 5. Start Backend Server
```bash
npm run dev
```

### 6. Connect MongoDB Compass
- Open MongoDB Compass
- Connect to: `mongodb://localhost:27017`
- Browse database: `wbc_food_marketplace`

## 🎯 What You'll See

### In MongoDB Compass:
- **Database:** `wbc_food_marketplace`
- **Collections:** `users`, `fooditems`, `orders`

### In Terminal:
```
✅ Connected to MongoDB successfully!
📊 Database: mongodb://localhost:27017/wbc_food_marketplace
🌐 Environment: development
Server is running on port 5000
```

## 🔧 Troubleshooting

### MongoDB Not Starting:
```cmd
# Check service status
sc query MongoDB

# Start service
net start MongoDB
```

### Connection Issues:
- Ensure MongoDB service is running
- Check if port 27017 is available
- Verify firewall settings

## 📱 Next Steps
1. Start frontend: `cd Frontend && npm run dev`
2. Open browser: `http://localhost:5173`
3. Register as buyer or seller
4. Test the application!

---

**Happy coding! 🎉**
