//following code checks if you're login crenditials are authenticated, if not
// it'll send you back to login.

const withAuth = (req,res,next)=>{
    if (!req.session.user_id){
        res.redirect('/login');
    }else{
        next();
    }
};

module.exports = withAuth;