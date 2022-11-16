const router = require('express').Router();
const withAuth = require('../../utils/withAuth')
const { Comment } = require('../../models');

//get all comments.
router.get('/', (req,res)=>{
    Comment.findAll()
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err=>{
            console.log(err);
            res.status(400).json(err);
        })
})

module.exports = router;