// app.js
const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const itemRoutes = require('./routes/itemRoutes');

dotenv.config();

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true })); // Add this for form data

// Connect to the database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/items', itemRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
