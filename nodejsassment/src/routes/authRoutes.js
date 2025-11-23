import express from "express";
import { register, login, getUsers, getUserDetails } from "../controllers/authController.js";
import { auth, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.get("/users", auth, isAdmin, getUsers);       // Admin only
router.get("/users/:id", auth, getUserDetails);     // Admin or self

export default router;
