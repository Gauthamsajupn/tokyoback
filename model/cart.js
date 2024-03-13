// models/item.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  email: { type: String, required: true },
  itemId: { type: String, required: true }, // Assuming itemId is also a string
  clothName: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  color: String,
  size: String,
  image: { type: String, required: true }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
