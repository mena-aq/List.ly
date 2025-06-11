const express = require('express');
const router = express.Router();

//controller functions
const {loginUser, registerUser, getAccountInfo} = require('../controllers/authController');

//middleware
const auth = require('../middleware/authMiddleware');

//routes
router.post('/login',loginUser);
router.post('/register',registerUser);
router.get('/profile',auth,getAccountInfo); //protected

module.exports = router;