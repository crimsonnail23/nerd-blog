const {Model, DataTypes}= require('sequelize');
const sequelize = require('../config/connection')

//create post mode.
class Post extends Model{};

Post.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
    }
)