const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { User, Post, Comment } = require('../../models');

//get all users. route= /api/users
router.get('/', (req,res)=>{
    //use findAll method with User model.
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err =>{
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;