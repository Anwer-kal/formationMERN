// routes/itemRoutes.js
const express = require('express');
const Item = require('../models/Item');

const router = express.Router();

// GET all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST a new item
router.post('/', async (req, res) => {
  const { name, price } = req.body;
  console.log( name, price)
  if (!name || !price) {
    return res.status(400).json({ message: 'Please add all required fields' });
  }
  try {
    const newItem = new Item({ name, price });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
