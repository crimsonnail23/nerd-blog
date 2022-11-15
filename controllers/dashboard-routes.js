const router = require('express').Router();
const sequelize = require('../config/connection');
const withAuth = require('../utils/withAuth');
const { Post, User, Comment } = require('../models');


//dashboard main page. GET ALL route.
router.get('/', withAuth, (req,res)=>{
    Post.findAll({
        where:{
            //use the ID from the session
            user_id: req.session.user_id
        },
        attributes:[
            'id',
            'post_link',
            'title',
            'created_at',
            
        ],
        include:[
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
    .then(dbPostData=>{
        //serialize data before passing to template.
        const posts = dbPostData.map(post=> post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });

});

module.exports = router;