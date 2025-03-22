const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require('nodemailer');

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try{
  const { email, password } = req.body;
  const user = await User.findOne({ email });
console.log(email, password)
const isMatch = await bcrypt.compare(password, user.password);
console.log("Password match:", isMatch);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });

} catch (err) {
  res.status(400).json({ error:  err });
}
};

exports.forgotPassword = async (req, res) => {
  try{
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ error: 'User not found' });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
  const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
  console.log(user)

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
  res.status(400).json({ error: 'Invalid or expired token', err });
}
};

exports.resetPassword = async (req, res) => {
  
  try {
  const { token } = req.params;
  const { password } = req.body;

  
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
console.log(decoded)
    user.password = await bcrypt.hash(password, 10);
    await user.save();

    res.json({ message: 'Password updated' });
  } catch (err) {
    res.status(400).json({ error: 'Invalid or expired token', err });
  }
};

exports.verifytoken = async (req, res) => {
  try {
  // If the token is valid, send a success response
  res.json({ authenticated: true, user: req.user });
} catch (err) {
  res.status(400).json({ error: 'Invalid or expired token', err });
}
}

