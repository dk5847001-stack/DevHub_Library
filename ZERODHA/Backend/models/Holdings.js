const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HoldingsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true,
    },
    avg: {
        type: Number,
        reequired: true,
    },
    price: {
        type: Number,
        required: true,
    },
    net: {
        type: String,
        require: true,
    },
    day: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model("Holding", HoldingsSchema);