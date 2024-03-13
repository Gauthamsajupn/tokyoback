// user.js (or any name you prefer for your schema file)

const mongoose = require('mongoose');

const signupSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    // unique: true,
    // trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', signupSchema);

module.exports = User;
