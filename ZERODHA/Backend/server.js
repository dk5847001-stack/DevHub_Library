require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/dbConfig");
const Holdings = require("./models/Holdings");
const Order = require("./models/Order");
const Positions = require("./models/Positions");
const User = require("./models/User");
const PORT = process.env.PORT;
const app = express();

const allowedOrigins = [
    "http://localhost:5174",
    "http://localhost:5173"
];
app.use(
    cors({
        origin: allowedOrigins,
        credentials: true
    })
);
app.use(express.json());
app.use(helmet());

connectDB();

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "api is working!"
    })
});

app.get("/positions", async (req, res) => {
    try {
        const tempPositions = [
            {
                product: "CNC",
                name: "EVEREADY",
                qty: 2,
                avg: 316.27,
                price: 312.35,
                net: "+0.58%",
                day: "-1.24%",
                isLoss: true,
            },
            {
                product: "CNC",
                name: "JUBLFOOD",
                qty: 1,
                avg: 3124.75,
                price: 3082.65,
                net: "+10.04%",
                day: "-1.35%",
                isLoss: true,
            },
        ];

        const newPositions = await Positions.insertMany(tempPositions);

        res.status(201).json({
            success: true,
            message: "Data saved successfully!",
            positions: newPositions,
        });

    } catch (error) {
        console.error("Error saving positions:", error);

        res.status(500).json({
            success: false,
            message: "Failed to save positions",
            error: error.message,
        });
    }
});

app.listen(PORT, () => {
    console.log(`🤖 The server is working on PORT ${PORT} ✓`);
});
