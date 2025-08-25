const database = require("../config/db");
const {DataTypes} = require("sequelize");
const User = require("./User");

const Text = database.define("Texts", {
    text:{
        type: DataTypes.TEXT,
        allowNull: false
    }
});

Text.belongsTo(User);
User.hasMany(Text);

module.exports = Text