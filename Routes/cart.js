// routes/cart.js
const express = require('express');
const router = express.Router();
const Order = require('../model/cart');

// Route to add item to cart
router.post('/add', async (req, res) => {
  try {
    // Extract order data from request body
    const { email, itemId, clothName, description, price, color, size, image } = req.body;

    // Create a new order instance
    const newOrder = new Order({
      email,
      itemId,
      clothName,
      description,
      price,
      color,
      size,
      image
    });

    // Save the new order to the database
    await newOrder.save();

    // Respond with success message
    res.status(201).json({ message: 'Order placed successfully' });
  } catch (error) {
    // Handle any errors
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'An error occurred while placing the order' });
  }
});


router.get('/details/:email', async (req, res) => {
    try {
      const { email } = req.params;
  
      // Find all items in the cart belonging to the specified email
      const cartItems = await Order.find({ email });
  
      // Respond with the cart items
      res.status(200).json(cartItems);
    } catch (error) {
      console.error('Error fetching cart items by email:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  

  router.delete('/remove/:itemId', async (req, res) => {
    try {
      const { itemId } = req.params;
  
      // Find the cart item by itemId and delete it from the database
      await Item.deleteOne({ itemId });
  
      res.status(200).json({ message: 'Item removed from cart successfully' });
    } catch (error) {
      console.error('Error removing item from cart:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  });


module.exports = router;
