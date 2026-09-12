const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.jsonwebtoken;

        // if user is not login
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Please login first!"
            })
        };

        // verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // saved usesr
        req.user = decoded

        // continue to next middleware/route
        next();
    } catch (err) {
        res.status(401).json({
            success: false,
            message: "Invalid or expired token!"
        })
    }
}

module.exports = authMiddleware;
