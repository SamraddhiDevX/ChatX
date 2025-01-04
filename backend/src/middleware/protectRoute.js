const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");

const protectRoute = async (req, res, next) => {
    try {
        // 1. Extract token from cookies
        const token = req.cookies.jwt;
        //console.log("Extracted JWT Token:", token);
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No token provided" });
        }

        // 2. Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //console.log("Decoded Token Payload:", decoded);

        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid token" });
        }

        // 3. Fetch the user and exclude the password field
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // 4. Attach user to the request object for further use
        req.user = user;
        next();

    } catch (error) {
        // Handle JWT-specific errors
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Unauthorized - Token expired" });
        } else if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Unauthorized - Invalid token" });
        }

        // Log and respond to other server errors
        console.error("Error in protect route middleware:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = protectRoute;
