const express = require("express");
const db = require("./db");
const app = express();
const cors = require("cors");
const router=require("./router/router")
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const cart=require("./Routes/cart")
const order=require("./Routes/orders")
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


mongoose.connect(db.mongoUrl)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });

    const corsOpts = {
        origin: '*',
    
        
    };
    // app.use(express.json())
    app.use(cors(corsOpts));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    


    app.use('/', router);
    app.use('/api/cart',cart)
    app.use('/api/order',order)

app.listen(db.port, () => {
    console.log(`Server is running on port ${db.port}`);
});
