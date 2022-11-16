const router = require('express').Router();
const withAuth = require('../../utils/withAuth')
const { Comment } = require('../../models');

//get all comments. route = api/comments/
router.get('/', (req,res)=>{
    Comment.findAll()
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err=>{
            console.log(err);
            res.status(400).json(err);
        })
});

//create a comment. route = api/comments/. uses middleware to authenticate.
router.post('/', withAuth, (req, res)=>{
    if(req.session){
        Comment.create({
            comment_body: req.body.comment_body,
            user_id: req.session.user_id,
            post_id: req.session.post_id
        })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err=>{
            console.log(err);
            res.status(400).json(err);
        })
    }
})

//delete a comment with id, also authenticate with withAuth. route= api/comments/:id
router.delete('/:id', withAuth,(req,res)=>{
    Comment.destory({
        where:{
            id: req.params.id
        }
    })
    .then(dbCommentData=>{
        if(!dbCommentData){
            res.status(404).json({ message: 'no commen with this id'})
            return;
        }
        res.json(dbCommentData)
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err)
    });
});

module.exports = router;