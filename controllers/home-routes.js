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
                attributes:['id', 'comment_body', 'post_id', 'user_id', 'created_at'],
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
            id: req.params.id
        },
        attributes:[
            'id',
            'post_link',
            'title',
            'created_at'
        ],  
        include:[
            {
                model: Comment,
                attributes:['id', 'comment_body', 'post_id', 'user_id', 'created_at'],
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
    .then(dbPostData=>{
        if(!dbPostData){
            res.status(404).json({ message: 'no post found with this id'})
        }
        const post = dbPostData.get({ plain: true });
        res.render('singple-post',{
            post,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
});

//login and signup
router.get('/login', (req,res)=>{
    if(req.session.loggedIn){
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;