const express = require('express');
const Item = require('../models/item');
const router = express.Router();
// GET all items
router.get('/', async (req, res) => {
try {
const items = await Item.find();//cherche dans bd cokection nom item pour retourn tous donne
res.status(200).json(items);
} catch (error) {
res.status(500).json({ message: 'Server error' });
}
});