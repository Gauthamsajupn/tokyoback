const mongoose = require("mongoose")

const admin = new mongoose.Schema({
    adminiD: {
        type: String,
        reqired: true,
        unique: true
    },
    adminName: {
        type: String,
        reqired: true,
    },
    email: {
        type: String,
        reqired: true,
    },
   
    password: {
        type: String,
        reqired: true,
    },

})

module.exports = mongoose.model("admin", admin);