const express = require('express');
const { register, login, forgotPassword, resetPassword, verifytoken } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.get('/verify-token', verifytoken);


module.exports = router;
