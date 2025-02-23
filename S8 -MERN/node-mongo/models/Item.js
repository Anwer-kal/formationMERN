// models/Item.js
const mongoose = require("mongoose");
const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  price: {
    type: Number,
    required: [true, "Please add a price"],
  },
});
const Item = mongoose.model("Item", ItemSchema);
module.exports = Item;
