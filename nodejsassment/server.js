import express from "express";
import dotenv from "dotenv";
import authRoutes from "./src/routes/authRoutes.js";
import { connectdb } from "./src/config/database.js";


const app = express();
app.use(express.json());
dotenv.config();

connectdb();


app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  console.log("Server Started ");
});
