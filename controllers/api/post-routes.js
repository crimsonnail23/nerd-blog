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

//get single post by Id. route= api/posts/:id
router.get('/:id', (req,res)=>{
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
        //if there's no post with the id, then throw this meessage.
        if(!dbPostData){
            res.status(404).json({ message: 'no post with this id.'})
            return;
        }
        res.json(dbPostData);
      })
      .catch(err=>{
        console.log(err);
        res.status(500).json(err);
      });
});

//create post. route= api/posts need to be logged in.
router.post('/', withAuth, (req, res) => {
    Post.create({
      title: req.body.title,
      post_url: req.body.post_url,
      user_id: req.session.user_id
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

//update post. route= api/posts/:id need to be logged in for this to work.
router.put('/:id', withAuth, (req, res) => {
Post.update(
    {
    title: req.body.title
    },
    {
    where: {
        id: req.params.id
    }
    }
)
    .then(dbPostData => {
    if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
    }
    res.json(dbPostData);
    })
    .catch(err => {
    console.log(err);
    res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
console.log('id', req.params.id);
Post.destroy({
    where: {
    id: req.params.id
    }
})
    .then(dbPostData => {
    if (!dbPostData) {
        res.status(404).json({ message: 'no post found with this id' });
        return;
    }
    res.json(dbPostData);
    })
    .catch(err => {
    console.log(err);
    res.status(500).json(err);
    });
});

module.exports = router;
  