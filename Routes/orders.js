// routes/order.js

const express = require('express');
const router = express.Router();
const Order=require('../model/orders')

// Route to add a new order
router.post('/add', async (req, res) => {
    try {
        // Create a new order instance with data from the request body
        const { email, itemId, clothName, description, price, color, size, image } = req.body.data;

        // Create a new item object
        const newItem = new Order({
          email,
          itemId,
          clothName,
          description,
          price,
          color,
          size,
          image
        });
        const savedOrder = await newItem.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.message });
    }
});

// Route to get all orders
router.get('/', async (req, res) => {
    try {
        // Fetch all orders from the database
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
