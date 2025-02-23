// models/Item.js
//schema de base 
const mongoose = require('mongoose');
const ItemSchema = new mongoose.Schema({
name: {
type: String,
required: [true, 'Please add a name'],
},
price: {
type: Number,
required: [true, 'Please add a price'],
},
});
const Item = mongoose.model('Item', ItemSchema); //connexion base de donne
module.exports = Item;