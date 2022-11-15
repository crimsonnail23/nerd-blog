const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// this is the '/' endpoint.
router.get('/', (req,res)=>{
    Post.findAll({
        attributes:[
            'id',
            'post_url',
            'title',
            'created_at'
        ], include:[
            {
                model: Comment,
                attributes:['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include:{
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
})