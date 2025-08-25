const {DataTypes} = require("sequelize");
const database = require("../config/db");

const User = database.define("Users", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = User;