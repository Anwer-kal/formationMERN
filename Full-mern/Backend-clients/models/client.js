const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    minlength: [3, 'Name must be at least 3 characters long'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please add a valid email address'],
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone number'],
    minlength: [10, 'Phone number must be at least 10 digits long'],
  },
  address: {
    type: String,
    default: 'No address provided',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
