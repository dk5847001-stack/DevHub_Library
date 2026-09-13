require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/dbConfig");

const Holdings = require("./models/Holdings");
const Order = require("./models/Order");
const Positions = require("./models/Positions");
const User = require("./models/User");

const signupRateLimiter = require("./middleware/signupRateLimiter");
const loginRateLimiter = require("./middleware/loginRateLimiter");
const adminMiddleware = require("./middleware/adminMiddleware");
const authMiddleware = require("./middleware/authMiddleware");

const PORT = process.env.PORT || 3000;

const app = express();

/* =========================================================
   CORS
========================================================= */

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    process.env.FRONTEND_URL,
    process.env.DASHBOARD_URL,
].filter(Boolean);

app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests without an origin
            // Example: Postman, server-to-server requests
            if (!origin) {
                return callback(null, true);
            }

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(
                new Error(`CORS blocked for origin: ${origin}`)
            );
        },
        credentials: true,
    })
);

/* =========================================================
   MIDDLEWARE
========================================================= */

app.use(express.json());

app.use(helmet());

app.use(cookieParser());

/* =========================================================
   RATE LIMITERS
========================================================= */

app.use("/signup", signupRateLimiter);

app.use("/login", loginRateLimiter);

/* =========================================================
   AUTH MIDDLEWARE
========================================================= */

app.use("/api", authMiddleware);

app.use("/admin", authMiddleware, adminMiddleware);

/* =========================================================
   DATABASE
========================================================= */

connectDB();

/* =========================================================
   HOME ROUTE
========================================================= */

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API is working!",
    });
});

/* =========================================================
   AUTH CHECK
========================================================= */

app.get("/api/auth/check", async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select(
            "-password"
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                authenticated: false,
                message: "User not found!",
            });
        }

        res.status(200).json({
            success: true,
            authenticated: true,
            user,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            authenticated: false,
            message: "Something went wrong!",
            error: err.message,
        });
    }
});

/* =========================================================
   HOLDINGS
========================================================= */

app.get("/api/allHoldings", async (req, res) => {
    try {
        const allHoldings = await Holdings.find({});

        res.status(200).json({
            success: true,
            message: "Holdings fetched successfully!",
            allHoldings,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong!",
            error: err.message,
        });
    }
});

/* =========================================================
   POSITIONS
========================================================= */

app.get("/api/allPositions", async (req, res) => {
    try {
        const allPositions = await Positions.find({});

        res.status(200).json({
            success: true,
            message: "Positions fetched successfully!",
            allPositions,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong!",
            error: err.message,
        });
    }
});

/* =========================================================
   NEW ORDER
========================================================= */

app.post("/api/newOrder", async (req, res) => {
    try {
        const { name, qty, price, mode } = req.body;

        const newOrder = await Order.create({
            name,
            qty,
            price,
            mode,
        });

        res.status(201).json({
            success: true,
            message: "Order placed successfully!",
            Order: newOrder,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong!",
            error: err.message,
        });
    }
});

/* =========================================================
   REGISTER / SIGNUP
========================================================= */

app.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        /* Validation */

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!",
            });
        }

        /* Normalize email */

        const normalizedEmail = email.trim().toLowerCase();

        /* Check existing user */

        const user = await User.findOne({
            email: normalizedEmail,
        });

        if (user) {
            return res.status(409).json({
                success: false,
                message: "User with this email already exists!",
            });
        }

        /* Hash password */

        const hashedPassword = await bcrypt.hash(password, 10);

        /* Create user */

        const savedUser = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword,
        });

        /* Generate JWT */

        const token = jwt.sign(
            {
                userId: savedUser._id,
                role: savedUser.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        /* Send cookie */

        res.cookie("jsonwebtoken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:
                process.env.NODE_ENV === "production"
                    ? "none"
                    : "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });

        /* Response */

        res.status(201).json({
            success: true,
            message: "User registered successfully! ✓",
            user: {
                name: savedUser.name,
                email: savedUser.email,
                role: savedUser.role,
            },
        });
    } catch (err) {
        console.error("Signup Error:", err);

        res.status(500).json({
            success: false,
            message: "Something went wrong!",
            error: err.message,
        });
    }
});

/* =========================================================
   LOGIN
========================================================= */

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        /* Validation */

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!",
            });
        }

        /* Normalize email */

        const normalizedEmail = email.trim().toLowerCase();

        /* Find user */

        const user = await User.findOne({
            email: normalizedEmail,
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exist with this email!",
            });
        }

        /* Compare password */

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(400).json({
                success: false,
                message: "Invalid password!",
            });
        }

        /* Generate JWT */

        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        /* Send cookie */

        res.cookie("jsonwebtoken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:
                process.env.NODE_ENV === "production"
                    ? "none"
                    : "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });

        /* Response */

        res.status(200).json({
            success: true,
            message: "User logged in successfully! ✓",
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (err) {
        console.error("Login Error:", err);

        res.status(500).json({
            success: false,
            message: "Something went wrong!",
            error: err.message,
        });
    }
});

/* =========================================================
   LOGOUT
========================================================= */

app.post("/logout", (req, res) => {
    res.clearCookie("jsonwebtoken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite:
            process.env.NODE_ENV === "production"
                ? "none"
                : "lax",
    });

    res.status(200).json({
        success: true,
        message: "Logged out successfully!",
    });
});

/* =========================================================
   POSITIONS TEMPORARY DATA
   Currently disabled
========================================================= */


// app.get("/holdings", async (req, res) => {
//     try {
//         const tempHoldings = [
//             {
//                 name: "BHARTIARTL",
//                 qty: 2,
//                 avg: 538.05,
//                 price: 541.15,
//                 net: "+0.58%",
//                 day: "+2.99%",
//             },
//             {
//                 name: "HDFCBANK",
//                 qty: 2,
//                 avg: 1383.4,
//                 price: 1522.35,
//                 net: "+10.04%",
//                 day: "+0.11%",
//             },
//             {
//                 name: "HINDUNILVR",
//                 qty: 1,
//                 avg: 2335.85,
//                 price: 2417.4,
//                 net: "+3.49%",
//                 day: "+0.21%",
//             },
//             {
//                 name: "INFY",
//                 qty: 1,
//                 avg: 1350.5,
//                 price: 1555.45,
//                 net: "+15.18%",
//                 day: "-1.60%",
//                 isLoss: true,
//             },
//             {
//                 name: "ITC",
//                 qty: 5,
//                 avg: 202.0,
//                 price: 207.9,
//                 net: "+2.92%",
//                 day: "+0.80%",
//             },
//             {
//                 name: "KPITTECH",
//                 qty: 5,
//                 avg: 250.3,
//                 price: 266.45,
//                 net: "+6.45%",
//                 day: "+3.54%",
//             },
//             {
//                 name: "M&M",
//                 qty: 2,
//                 avg: 809.9,
//                 price: 779.8,
//                 net: "-3.72%",
//                 day: "-0.01%",
//                 isLoss: true,
//             },
//             {
//                 name: "RELIANCE",
//                 qty: 1,
//                 avg: 2193.7,
//                 price: 2112.4,
//                 net: "-3.71%",
//                 day: "+1.44%",
//             },
//             {
//                 name: "SBIN",
//                 qty: 4,
//                 avg: 324.35,
//                 price: 430.2,
//                 net: "+32.63%",
//                 day: "-0.34%",
//                 isLoss: true,
//             },
//             {
//                 name: "SGBMAY29",
//                 qty: 2,
//                 avg: 4727.0,
//                 price: 4719.0,
//                 net: "-0.17%",
//                 day: "+0.15%",
//             },
//             {
//                 name: "TATAPOWER",
//                 qty: 5,
//                 avg: 104.2,
//                 price: 124.15,
//                 net: "+19.15%",
//                 day: "-0.24%",
//                 isLoss: true,
//             },
//             {
//                 name: "TCS",
//                 qty: 1,
//                 avg: 3041.7,
//                 price: 3194.8,
//                 net: "+5.03%",
//                 day: "-0.25%",
//                 isLoss: true,
//             },
//             {
//                 name: "WIPRO",
//                 qty: 4,
//                 avg: 489.3,
//                 price: 577.75,
//                 net: "+18.08%",
//                 day: "+0.32%",
//             },
//         ];

//         const newHoldings =
//             await Holdings.insertMany(tempHoldings);

//         res.status(201).json({
//             success: true,
//             message: "Data saved successfully!",
//             holdings: newHoldings,
//         });
//     } catch (error) {
//         console.error("Error saving positions:", error);

//         res.status(500).json({
//             success: false,
//             message: "Failed to save positions",
//             error: error.message,
//         });
//     }
// });


/* =========================================================
   SERVER
========================================================= */

app.listen(PORT, "0.0.0.0", () => {
    console.log(
        `🤖 The server is working on PORT ${PORT} ✓`
    );
});