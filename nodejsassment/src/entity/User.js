import { EntitySchema } from "typeorm";

const User = new EntitySchema({
    name: "User",
    tableName: "users",
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true
        },
        name: {
            type: String,
            nullable: false
        },
        email: {
            type: String,
            unique: true,
            nullable: false
        },
        password: {
            type: String,
            nullable: false
        },
        role: {
            type: String,
            default: "user",
            nullable: false
        },
        phone: {
            type: String,
            nullable: true
        },
        city: {
            type: String,
            nullable: true
        },
        country: {
            type: String,
            nullable: true
        },
        createdAt: {
            type: "datetime",
            createDate: true
        },
        updatedAt: {
            type: "datetime",
            updateDate: true
        }
    }
});

export default User;
