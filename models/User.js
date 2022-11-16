const bcrypt = require('bcrypt');
const { Model, DataTypes}= require('sequelize');
const sequelize = require('../config/connection');

//creates the user model.
class User extends Model{
    //check password.
    checkPassword(loginPw){
        return bcrypt.compareSync(loginPw, this.password);
    }
};

//defines tables and columns for User.
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
        sequelize: sequelize,
        timestamps: false,
        undercored: true,
        freezeTableName: true,
        modelName: 'user'
    },
    {
        hooks: {
            async beforeCreate(newUserData){
                newUserData.password= await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            async beforeUpdate(updatedUserData){
                updatedUserData.password=await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        }
    },

);

module.exports = User;