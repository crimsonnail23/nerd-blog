const router = require('express').Router();
const sequelize = require('../config/connection');
const withAuth = require('../utils/withAuth');
const { Post, User, Comment } = require('../models');


//dashboard main page. GET ALL route= dashboard/
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
        //serialize data before passing to template.
        const posts = dbPostData.map(post=> post.get({ plain: true }));
        //will render the template with information passed in the posts variable.
        res.render('dashboard', { posts, loggedIn: true });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });

});

//edit post route = dashboard/edit/:id
router.get('/edit/:id', withAuth, (req,res)=>{
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'post_link',
            'title',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_body', 'post_id', 'user_id', 'created_at'],
                include: {
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
        
        const post = dbPostData.get({ plain: true });
        //will render the template with information passed in the posts variable.
        res.render('edit-post',{post, loggedIn:true})
    });
});

module.exports = router;