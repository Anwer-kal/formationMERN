// models/Car.js
const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true
  },
  available: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Car', carSchema);
