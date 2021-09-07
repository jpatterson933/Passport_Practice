const router = require('express').Router();
const passport = require('passport');

// auth login route
router.get('/login', (req, res) => {
    res.render('login')
});

// auth logout route
router.get('/logout', (req, res) => {
    // handle this route with passport
    res.send('logging out');
    
})

//auth login with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    // we are sending back the req.user - so we should see the logged in user
    res.send(req.user);
})

module.exports = router;