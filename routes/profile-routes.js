const router = require('express').Router();

// middleware: a function that checks if the username is logged in and if they are not logged in it wont run any code that is below it
const authCheck = (req, res, next) => {
    if(!req.user){
        // if user is not logged in
        res.redirect('/auth/login');
    } else {
        // if user is logged in - next means goes onto the next peice of middle ware
        next();
    }

}

router.get('/', authCheck, (req, res) => {
    res.send('you are logged in, this is your profile - ' + req.user.username)
});

module.exports = router;