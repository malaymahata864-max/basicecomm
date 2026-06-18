const express = require('express');
const {registerUser,loginUser,logoutUser,getUsers} = require('../controllers/authController');
const isLoggedIn = require('../middleware/isLoggedIn');
const isAdmin = require('../middleware/isAdmin');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', isLoggedIn, logoutUser);
router.get('/users', isLoggedIn, isAdmin, getUsers);

module.exports = router;