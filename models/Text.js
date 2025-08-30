const database = require("../config/db");
const {DataTypes} = require("sequelize");

const Text = database.define("Texts", {
    text:{
        type: DataTypes.TEXT,
        allowNull: false
    }
});


module.exports = Text