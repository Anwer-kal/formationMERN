const bcrypt = require('bcryptjs');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        console.log(email, password)

        await newUser.save();
        console.log(email, password)

        res.json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Store user session
        req.session.user = { id: user._id, email: user.email };

        res.json({ message: 'Login successful' });
    } catch (err) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
};

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ error: 'Logout failed' });
        res.json({ message: 'Logged out successfully' });
    });
};

exports.checkAuth = (req, res) => {
    if (req.session.user) {
        res.json({ authenticated: true, user: req.session.user });
    } else {
        res.status(401).json({ authenticated: false });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ error: 'User not found' });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            to: email,
            subject: 'Password Reset',
            text: `Click the link to reset your password: ${resetLink}`
        });

        res.json({ message: 'Email sent' });
    } catch (err) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        user.password = await bcrypt.hash(password, 10);
        await user.save();

        res.json({ message: 'Password updated' });
    } catch (err) {
        res.status(400).json({ error: 'Invalid or expired token', details: err.message });
    }
};
