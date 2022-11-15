const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model{}

Comment.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true 
        },
        commentBody:{
            type: DataTypes.STRING,
            allowNull: false,
            //following code will require a minimum number of characters for all comments.
            validate: {

                len:[5]
            } 
        },
        user_id:{
            type: DataTypes.INTEGER,
            references:{
                model: 'user',
                key: 'id'
            }
        },
        post_id:{
            type: DataTypes.INTEGER,
            references:{
                model: 'post',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment'
    }
);
module.exports = Comment;