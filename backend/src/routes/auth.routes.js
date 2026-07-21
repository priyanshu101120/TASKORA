const express = require('express');
const router = express.Router();
const { registerUser, login,logoutuser,getUserProfile } = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/register', registerUser);
router.post('/login', login);
router.post('/logout', logoutuser);
router.get('/profile', authMiddleware, getUserProfile);

module.exports = router;