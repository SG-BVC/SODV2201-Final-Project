import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        if (!name || !email || !password)
            return res.status(400).json({ message: "Name, email and password required" });

        const existing = await User.findOne({ email });
        if (existing) return res.status(409).json({ message: "Email already exists" });

        const user = new User({ name, email, password, role });
        await user.save();

        const token = jwt.sign(
            { id: user._id, email, role },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );

        res.status(201).json({ token, user: { id: user._id, name, email, role } });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password required" });
        }

        const user = await User.findOne({ name: username });
        if (!user) return res.status(401).json({ message: "Invalid username or password" });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(401).json({ message: "Invalid username or password" });

        const token = jwt.sign(
            { id: user._id, username: user.name, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );

        res.json({
            token,
            user: {
                id: user._id,
                username: user.name,
                email: user.email,
                role: user.role,
                is_admin: user.role === "admin"
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

