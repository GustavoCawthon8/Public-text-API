require('dotenv').config();
const Sequelize = require('sequelize');
const chalk = require('chalk');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    ssl:{
        require: true,
        rejectUnauthorized: false
    }
});

try{
    sequelize.authenticate();
    console.log(chalk.green('Conexão estabelecida com sucesso!'));
}catch(error){
    console.log(chalk.red(error));
}

module.exports = sequelize;