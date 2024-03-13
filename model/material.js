// In a file, e.g., models/Category.js

const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  iD: {
    type:String,
    required:true,
    unique: true
  },
  clothName: {
    type: String,
    required: true,
     
  },
  material: {
    type: String,
    required: true,
     
  },
  color: {
    type: String,
    required: true,
     
  },
  size: {
    type: String,
    required: true,
     
  },
  price: {
    type: Number,
    required: true,
     
  },
  description: {
    type: String,
    required: true,
     
  },
  category:{
    type:String,
    required:true
  },
  status: {
    type: Boolean,
    default:false // Assuming default status is inactive
  },
  
 
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
