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

//GET sinle user by id. Route= /api/users/:id
router.get('/:id', (req,res)=>{
    User.findOne({
        attributes: { exclude: ['password'] },
        where:{
            id: req.params.id
        },
        include:[
            {
                model: Post,
                attributes: ['id', 'title', 'post_link', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'commentBody', 'created_at'],
                include:{
                    model: Post,
                    attibutes: ['title']
                }
            }
        ]
    })
    .then(dbUserData=>{
        if(!dbUserData){
            res.status(404).json({ message: 'no user with that id, sorry'})
        }
        res.json(dbUserData)
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
})    

module.exports = router;