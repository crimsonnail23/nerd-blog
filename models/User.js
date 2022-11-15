const { Model, DataTypes}= require('sequelize');
const sequelize = require('sequelize');

class User extends Model{};

User.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
            //password must be at least 8 characters long.
            validate: {
                len: [8]
            }
        }    
    },
    {
        sequelize,
        timestamps: false,
        undercored: true,
        freezeTableName: true,
        modelName: 'user'
    }

);

module.exports = User;