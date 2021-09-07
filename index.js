const express = require('express');
const authRoutes = require('./routes/auth-routes');
const app = express();
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
//used to control user session - take cookie, set a max age, encrypt it and send it to the browser
const cookieSession = require('cookie-session');
const passport = require('passport');

// view engine
app.set('view engine', 'ejs');

// set up cookie session
app.use(cookieSession ({
    // sets max age to 1 day
    maxAge: 24 * 60 * 60 * 1000,
    // use keys to encrypt ids before hitting the browser - stored in keys file
    keys: [keys.session.cookieKey]
}));

// initialize passport -- this is middleware
app.use(passport.initialize());
// control our logging in with session cookies
app.use(passport.session());

// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('connected to mongodb')
})

// setup routes
app.use('/auth', authRoutes);

// home route
app.get('/', (req, res) => {
    res.render('home');
})

app.listen(3000, () => {
    console.log('app now listening for requests on port 3000');
});