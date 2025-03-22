const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();


router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/check-session', authController.checkAuth);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);

module.exports = router;
