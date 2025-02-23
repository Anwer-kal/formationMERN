// config/db.js
const mongoose = require('mongoose');// appel mongos
require('dotenv').config();// appel dotenv
const connectDB = async () => {
try {
await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true,
useUnifiedTopology: true });
console.log('MongoDB connected');
} catch (error) {
console.error('MongoDB connection error:', error);
process.exit(1);
}
};

module.exports = connectDB;