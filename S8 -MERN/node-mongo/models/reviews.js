const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: String,
    required: [true, 'User name is required'],
  },
  rating: {
    type: Number,
    min: [0, 'Rating must be at least 0'],
    max: [5, 'Rating must be at most 5'],
    required: [true, 'Rating is required'],
  },
  comment: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    minlength: [3, 'Name must be at least 3 characters long'],
    maxlength: [100, 'Name cannot be longer than 100 characters'],
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [0, 'Price cannot be negative'],
  },
  description: {
    type: String,
    default: 'No description provided',
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  categories: {
    type: [String],
    enum: ['Electronics', 'Clothing', 'Food', 'Furniture'],
  },
  ratings: {
    type: Number,
    min: [0, 'Rating must be between 0 and 5'],
    max: [5, 'Rating must be between 0 and 5'],
  },
  imageUrl: {
    type: String,
    validate: {
      validator: function (v) {
        return /^(http|https):\/\/[^ "]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid URL`,
    },
  },
  tags: {
    type: [String],
    default: [],
  },
  dimensions: {
    type: Map,
    of: Number,
  },
  manufacturer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Manufacturer',
  },
  reviews: {
    type: [reviewSchema], // Tableau d'objets contenant les avis des utilisateurs
    default: [],
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
