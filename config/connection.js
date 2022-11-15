//import sequelze constrcutor.
const Sequelize= require('sequelize');

require('dotenv').config();

//create connection to database and pass in ENV variables.
const sequelize= new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,{
    
})