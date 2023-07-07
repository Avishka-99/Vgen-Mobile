
const { DataTypes } = require('sequelize');
const sequelize = require('./db');

// Define the User model
const product = sequelize.define('product', {
 productId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,

 },quantity:{
        type: DataTypes.INTEGER,    
        allowNull: true
 },description:{
        type: DataTypes.STRING,
        allowNull: true
 },productName:{
        type: DataTypes.STRING,
        allowNull: true
 },price:{
        type: DataTypes.INTEGER,
        allowNull: true
 },productImage:{
        type: DataTypes.STRING,
        allowNull: true
 },
},

 {
    timestamps: false,
});

module.exports = product;