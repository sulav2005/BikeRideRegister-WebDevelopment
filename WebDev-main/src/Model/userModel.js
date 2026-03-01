import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../Database/db.js";

export const users = sequelize.define("user",{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    customerName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    customerAddress: {
    type: DataTypes.STRING,
    },
    customerGender: {
        type: DataTypes.STRING,
    },
    customerType: {
        type: DataTypes.STRING,
    },
    customerPassword: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});