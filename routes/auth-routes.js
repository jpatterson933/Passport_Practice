const router = require('express').Router();

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
router.get('/google', (req, res) => {
    // handle this route with passport
    res.send('logging in with google');
});

module.exports = router;