const mongoose = require('mongoose');

// Define a Mongoose schema for order details
const OrderSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    clothName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    // Add more fields as needed
});

// Define a Mongoose model based on the schema
const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
