import jwt from "jsonwebtoken";
import User from "../models/User.js";

const auth = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({ msg: "Not authorized, no token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password"); // exclude password
        if (!user) return res.status(401).json({ msg: "Not authorized, user not found" });

        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ msg: "Not authorized, invalid token" });
    }
};

const adminOnly = (req, res, next) => {
    if (req.user?.role === "admin") {
        next();
    } else {
        res.status(403).json({ msg: "Admin access required" });
    }
};

export { auth, adminOnly };
