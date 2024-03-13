const mongoose = require('mongoose');

const order = new mongoose.Schema({
    customerName:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    pincode:{
        type:Number,
        required: true
    },
    phoneno:{
        type:Number,
        required: true
    },
    orderId:{
        type: mongoose.Schema.Types.String,
        ref: 'material', 
        required: true
    }

})
const Order = mongoose.model('order', order);

module.exports = Order;
