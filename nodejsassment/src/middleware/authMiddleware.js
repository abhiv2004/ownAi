import jwt from "jsonwebtoken";
import { AppDataSource } from "../config/database.js";
import User from "../entity/User.js";

// Authentication middleware
export const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

        if (!token) {
            return res.status(401).json({ message: "Token required" });
        }

        if (!process.env.SECRETKEY) {
            return res.status(500).json({ message: "SECRETKEY not configured" });
        }

        // Verify JWT
        const decoded = jwt.verify(token, process.env.SECRETKEY);

        const userRepo = AppDataSource.getRepository(User);
        const user = await userRepo.findOneBy({ id: Number(decoded.id) });

        if (!user) {
            return res.status(401).json({ message: "Invalid token" });
        }

        req.user = user; // attach user to request
        next();

    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Unauthorized" });
    }
};

// Admin authorization middleware
export const isAdmin = (req, res, next) => {
    if (req.user.role?.toLowerCase() !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
    }
    next();
};
