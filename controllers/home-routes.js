const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// this is the '/' endpoint. it is the GET ALL route.
router.get('/', (req,res)=>{
    Post.findAll({
        attributes:[
            'id',
            'post_link',
            'title',
            'created_at'
        ], include:[
            {
                model: Comment,
                attributes:['id', 'commentBody', 'post_id', 'user_id', 'created_at'],
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
    .then(dbPostData =>{
        //pass single post into the homepage template.
        const posts = dbPostData.map(post=>post.get({ plain: true}))
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});

// GET route for a single post.
router.get('/post/:id', (req,res)=>{
    Post.findOne({
        where:{
            
        }
    })
})