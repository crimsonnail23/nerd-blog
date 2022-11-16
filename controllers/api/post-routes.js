const router = require('express').Router();
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/withAuth');
const { Post, User, Comment} = require('../../models');

//GET ALL posts. route = api/posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'post_link',
            'title',
            'created_at',
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
    .then(dbPostData=>res.json(dbPostData))
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
})