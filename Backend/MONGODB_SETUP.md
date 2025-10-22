# MongoDB Setup & Compass Connection Guide

## 🚀 Quick Start

### 1. Install MongoDB Community Server

**Download from Official Site:**
- Go to [MongoDB Download Center](https://www.mongodb.com/try/download/community)
- Select "Windows" and download the MSI installer
- Run the installer and follow the setup wizard
- **Important:** Check "Install MongoDB as a Service" during installation

### 2. Start MongoDB Service

**Option A: Using Command Prompt (Run as Administrator)**
```cmd
net start MongoDB
```

**Option B: Using Services Manager**
1. Press `Win + R`, type `services.msc`
2. Find "MongoDB" service
3. Right-click and select "Start"

**Option C: Using PowerShell (Run as Administrator)**
```powershell
Start-Service MongoDB
```

### 3. Install MongoDB Compass

1. Download from [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Install and launch MongoDB Compass

## 🔗 Connect to MongoDB Compass

### Connection String
```
mongodb://localhost:27017
```

### Step-by-Step Connection:

1. **Open MongoDB Compass**
2. **In the connection screen, enter:**
   - **Connection String:** `mongodb://localhost:27017`
   - **Or use the form:**
     - **Hostname:** `localhost`
     - **Port:** `27017`
     - **Authentication:** None (for local development)

3. **Click "Connect"**

### Expected Result:
- You should see your local MongoDB instance
- The database `wbc_food_marketplace` will be created when you first run the application

## 🗄️ Database Structure

Once connected, you'll see these collections:

### Collections:
- **users** - User accounts (buyers and sellers)
- **fooditems** - Homemade food items
- **orders** - Order history (future feature)

### Sample Data Structure:

#### Users Collection:
```json
{
  "_id": ObjectId("..."),
  "name": "Sarah Johnson",
  "email": "sarah@example.com",
  "role": "seller",
  "businessName": "Sarah's Kitchen",
  "businessDescription": "Homemade baked goods",
  "isActive": true,
  "createdAt": ISODate("..."),
  "updatedAt": ISODate("...")
}
```

#### FoodItems Collection:
```json
{
  "_id": ObjectId("..."),
  "name": "Grandma's Apple Pie",
  "description": "Traditional apple pie made with family recipe",
  "price": 15.99,
  "category": "desserts",
  "isHomemade": true,
  "homemadeDetails": {
    "preparationMethod": "family-recipe",
    "ingredientsSource": "fresh-local",
    "preparationTime": "same-day"
  },
  "seller": ObjectId("..."),
  "images": ["image1.jpg", "image2.jpg"],
  "rating": {
    "average": 4.5,
    "count": 12
  },
  "createdAt": ISODate("..."),
  "updatedAt": ISODate("...")
}
```

## 🛠️ Troubleshooting

### Common Issues:

#### 1. "Connection Refused" Error
**Solution:**
```cmd
# Check if MongoDB service is running
sc query MongoDB

# Start the service if it's not running
net start MongoDB
```

#### 2. "MongoDB service not found"
**Solution:**
- Reinstall MongoDB with "Install as Service" option checked
- Or run MongoDB manually:
```cmd
mongod --dbpath "C:\data\db"
```

#### 3. "Port 27017 already in use"
**Solution:**
```cmd
# Find what's using the port
netstat -ano | findstr :27017

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

#### 4. "Access Denied" Error
**Solution:**
- Run Command Prompt as Administrator
- Check Windows Firewall settings
- Ensure MongoDB service has proper permissions

## 🔧 Development Commands

### Start Backend Server:
```bash
cd Backend
npm run dev
```

### Check MongoDB Status:
```cmd
# Check service status
sc query MongoDB

# Check if MongoDB is listening on port 27017
netstat -an | findstr 27017
```

### MongoDB Shell (Optional):
```cmd
# Connect to MongoDB shell
mongo

# Or with specific database
mongo wbc_food_marketplace
```

## 📊 Compass Features

### What You Can Do in Compass:

1. **Browse Collections:**
   - View all documents in each collection
   - Filter and search documents
   - Edit documents directly

2. **Monitor Performance:**
   - View database statistics
   - Monitor query performance
   - Check index usage

3. **Schema Analysis:**
   - Analyze document structure
   - View data types and patterns
   - Identify schema inconsistencies

4. **Query Interface:**
   - Write and execute MongoDB queries
   - Test aggregation pipelines
   - Export query results

## 🔐 Security Notes

### For Development:
- MongoDB runs without authentication by default
- This is fine for local development
- **Never use this configuration in production**

### For Production:
- Enable authentication
- Use strong passwords
- Configure network access restrictions
- Enable SSL/TLS encryption

## 📝 Next Steps

1. **Start MongoDB service**
2. **Connect Compass to `mongodb://localhost:27017`**
3. **Run the backend server: `npm run dev`**
4. **Create a user account through the application**
5. **Check Compass to see the data being created**

## 🆘 Need Help?

If you encounter issues:
1. Check MongoDB service status
2. Verify port 27017 is not blocked
3. Ensure you have proper permissions
4. Check Windows Firewall settings
5. Try restarting the MongoDB service

---

**Happy coding! 🚀**
