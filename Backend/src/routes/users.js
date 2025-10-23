const express = require('express');
const User = require('../models/User');
const { protect, isSeller } = require('../middleware/auth');
const userController = require('../controllers/userController');
const router = express.Router();


router.post('/login',userController.loginUser);
router.post('/register',userController.registerUser);
router.get('/profile',protect,userController.getUserProfile);
router.put('/profile',protect,userController.updateUserProfile);
router.get('/',protect,isSeller,userController.getAllUsers);




module.exports = router;
