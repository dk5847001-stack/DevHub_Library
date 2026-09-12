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
app.use(cookieParser());
app.use("/signup", signupRateLimiter);
app.use("/login", loginRateLimiter);
app.use("/api", authMiddleware);
app.use("/admin", authMiddleware, adminMiddleware);

connectDB();

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "api is working!"
    })
});

app.get("/api/auth/check", async (req, res) => {
    const user = await User.findById(req.user.userId)
    res.status(200).json({
        success: true,
        authenticated: true,
        user
    });
});

app.get("/api/allHoldings", async (req, res) => {
    let allHoldings = await Holdings.find({});
    res.status(200).json({
        success: true,
        message: "holdings fetch successfully!",
        allHoldings
    })
})
app.get("/api/allPositions", async (req, res) => {
    let allPositions = await Positions.find({});
    res.status(200).json({
        success: true,
        message: "Positions fetch successfully!",
        allPositions
    })
});

app.post("/api/newOrder", async (req, res) => {
    try {
        const { name, qty, price, mode } = req.body;
        const newOrder = await Order.create({
            name,
            qty,
            price,
            mode
        });
        res.status(201).json({
            success: true,
            message: "Order placed successfully!",
            Order: newOrder
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "something went wrong!",
            error: err.message
        })
    }
});

// -------------------- Register Route -----------------------
app.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // validation check
        if (!name || !email || !password) {
            return res.status(401).json({
                success: false,
                message: "All fields are required!"
            })
        };

        // normalizedEmail
        const normalizedEmail = email.trim().toLowerCase();

        // if user already exists
        const user = await User.findOne({
            email: normalizedEmail
        });
        if (user) {
            return res.status(401).json({
                success: false,
                message: "user with this email, already exist!"
            })
        };

        // hashing password 
        const hashedPassword = await bcrypt.hash(password, 10);

        // user created successfully!
        const savedUser = await User.create({
            name,
            email: normalizedEmail,
            password: hashedPassword
        });

        // Generate jwt token
        const token = jwt.sign(
            {
                userId: savedUser._id,
                role: savedUser.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        // cookie send successfully!
        res.cookie("jsonwebtoken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });

        // response send successfully!
        res.status(201).json({
            success: true,
            message: "user registered successfully! ✓",
            user: {
                name: savedUser.name,
                email: savedUser.email,
                role: savedUser.role
            }
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "something went wrong!",
            error: err.message
        })
    }
});

// ------------------LOGIN ROUTE---------------------
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // validation check
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!"
            })
        };

        // normalizedEmail
        const normalizedEmail = email.trim().toLowerCase();

        // if user is not exists
        const user = await User.findOne({
            email: normalizedEmail
        });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not exists with this email!"
            })
        };

        // compare password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );
        if (!isPasswordCorrect) {
            return res.status(400).json({
                success: false,
                message: "Invalid password!"
            })
        };

        // Generate jwt token
        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        // cookie send successfully!
        res.cookie("jsonwebtoken", token, {
            httpOnly: true,
            secure: process.env.NOTE_ENV === "production",
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });

        // response send successfully
        res.status(200).json({
            success: true,
            message: "user logged in successfully!✓",
            user: {
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "something went wrong!",
            error: err.message
        })
    }
});

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


// app.get("/positions", async (req, res) => {
//     try {
//         const tempPositions = [
//             {
//                 product: "CNC",
//                 name: "EVEREADY",
//                 qty: 2,
//                 avg: 316.27,
//                 price: 312.35,
//                 net: "+0.58%",
//                 day: "-1.24%",
//                 isLoss: true,
//             },
//             {
//                 product: "CNC",
//                 name: "JUBLFOOD",
//                 qty: 1,
//                 avg: 3124.75,
//                 price: 3082.65,
//                 net: "+10.04%",
//                 day: "-1.35%",
//                 isLoss: true,
//             },
//         ];

//         const newPositions = await Positions.insertMany(tempPositions);

//         res.status(201).json({
//             success: true,
//             message: "Data saved successfully!",
//             positions: newPositions,
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

app.listen(PORT, () => {
    console.log(`🤖 The server is working on PORT ${PORT} ✓`);
});
