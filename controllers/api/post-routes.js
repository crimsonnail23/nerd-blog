const router = require('express').Router();
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/withAuth');
const { Post, User, Comment} = require('../../models');

//GET ALL posts. route = api/posts
router.get('/', (req, res) => {
    Post.findAll({
        
    })
})