import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../config/database.js";
import User from "../entity/User.js";
import { isEmpty } from "../utils/validate.js";

// Register new user
export const register = async (req, res) => {
    try {
        const { name, email, password, role, phone, city, country } = req.body;

        if (isEmpty(name) || isEmpty(email) || isEmpty(password))
            return res.status(400).json({ message: "Missing required fields" });

        const userRepo = AppDataSource.getRepository(User);
        const existing = await userRepo.findOneBy({ email });

        if (existing) return res.status(400).json({ message: "Email already used" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = userRepo.create({
            name,
            email,
            password: hashedPassword,
            role: role || "user",
            phone,
            city,
            country
        });

        await userRepo.save(user);

        const { password: _, ...safeUser } = user; // remove password
        res.json({ message: "Registered successfully", user: safeUser });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Login user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userRepo = AppDataSource.getRepository(User);

        const user = await userRepo.findOneBy({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: "Incorrect password" });

        if (!process.env.SECRETKEY) {
            return res.status(500).json({ message: "SECRETKEY not configured" });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.SECRETKEY,
            { expiresIn: "1d" }
        );

        res.json({ message: "Login success", token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get all users (Admin sees all, staff sees only themselves)
export const getUsers = async (req, res) => {
    try {
        const repo = AppDataSource.getRepository(User);
        const { search, country } = req.query;

        let query = repo.createQueryBuilder("user");

        // Admin sees all
        if (req.user.role?.toLowerCase() !== "admin") {
            query = query.where("user.id = :id", { id: req.user.id });
        } else {
            // Admin: apply search / country filters
            if (search) {
                query = query.where(
                    "user.name LIKE :s OR user.email LIKE :s",
                    { s: `%${search}%` }
                );
            }

            if (country) {
                if (query.expressionMap.wheres.length > 0) {
                    query = query.andWhere("user.country = :country", { country });
                } else {
                    query = query.where("user.country = :country", { country });
                }
            }
        }

        const users = await query.getMany();

        const safeUsers = users.map(u => {
            const { password, ...rest } = u;
            return rest;
        });

        res.json(safeUsers);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get single user details
export const getUserDetails = async (req, res) => {
    try {
        const userId = Number(req.params.id);
        const repo = AppDataSource.getRepository(User);

        // Staff can only access their own details
        if (req.user.role?.toLowerCase() === "staff" && req.user.id !== userId) {
            return res.status(403).json({ message: "Not allowed" });
        }

        const user = await repo.findOneBy({ id: userId });
        if (!user) return res.status(404).json({ message: "User not found" });

        const { password, ...safeUser } = user;
        res.json(safeUser);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
