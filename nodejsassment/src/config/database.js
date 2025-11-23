import { DataSource } from "typeorm";
import User from "../entity/User.js";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "assessment.db",
    synchronize: true,
    logging: false,
    entities: [User]
});

export const connectdb = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Database connected using SQLite");
    } catch (error) {
        console.log("Database connection error", error);
    }
};
