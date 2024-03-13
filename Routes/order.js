const Order = require("../model/order");
const Material = require("../model/material");

module.exports = {
    addOrder: async (req, res) => {
        try {
            const { iD, customerName, address, pincode, phoneno } = req.body;
            const material = await Material.findOne({ iD });

            if (!material) {
                return res.status(404).json({ error: 'product not found' });
            }

            material.isBooked = true; // Assuming you have a field like 'isBooked' in your package schema
            await material.save();

            const order = new Order({ orderId: iD, customerName, address, pincode, phoneno }); // Pass iD as packageID
            await order.save();
            console.log("Details:", order);
            res.status(200).json({ message: 'Booking successful' });

        } catch (error) {
            console.error("Error adding order:", error);
            res.status(500).json({ error: "Failed to add order" });
        }
    },

    listOrder: async (req, res) => {
        try {
            const result = await Order.find({})
            const orders = [];
            for (const ele of result) {
                let order = {};
                order._id = ele._id;
                order.orderId = ele.orderId;
                order.customerName = ele.customerName;
                order.pincode = ele.pincode;
                order.phoneno = ele.phoneno;
                order.address = ele.address;
                orders.push(order);
            }
            console.log("Bookings:",orders);
            res.status(201).json(orders);

        } catch (error) {
            console.log("Error at Routes/order.js listOrders::", error);
            res.status(400).send(error.message);
        }
    }

}