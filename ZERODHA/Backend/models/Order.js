const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrdersSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    price: {
        type: String,
        require: true
    },
    mode: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model("Order", OrdersSchema);