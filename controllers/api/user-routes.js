const router = require('express').Router();
const withAuth = require('../../utils/withAuth');
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
    });
});

//POST route= api/user. this piece of code will create a new user.
router.post('/', withAuth, (req,res)=>{
    // expects uesername: learnatine, email: learnatine@email.com, password: password.
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData =>{
        req.session.save(()=>{
            req.session.user_id = dbUserData.id,
            req.session.username = dbUserData.username,
            req.session.loggedIn = true;

            res.json(dbUserData);
        });
    })
});

//login route = api/login
router.post('/login', (req,res)=>{
    User.findOne({
        where:{
            email: req.body.email
        }
    }).then(dbUserData=>{
        if(!dbUserData){
            res.status(400).json({ message: 'no user with that email address'});
            return;
        }

        const validPassword = dbUserData.checkPassword(req.body.password);
        if(!validPassword){
            res.status(400).json ({ message: 'incorrect password' });
            return;
        }
        req.session.save(()=>{
            //declare session variables.
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username,
            req.session.loggedIn= true;

            res.json({ user: dbUserData, message: 'you are now logged in' });
        });
    });
});

//logout.
router.post('/logout',(req,res)=>{
    if(req.session.loggedIn){
        req.session.destroy(()=>{
            res.status(204).end();
        });
    }
    else{
        res.status(404).end();
    }
});


module.exports = router;