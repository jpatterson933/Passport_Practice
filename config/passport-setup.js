const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model');


//done method is basically passing it to the next stage of the passport process
//passing the done method the user id associated with that user on OUR DATA that will get stuffed into a cooke
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// when the cookie comes back from the browser, take the id that is stored in it and find the user based on the stored user 
passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    })
});


passport.use(
    new GoogleStrategy({
        // options for the strategy
        callbackURL: '/auth/google/redirect',
        // client id and client secret
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
        // passport callback function
    }, (accessToken, refreshToken, profile, done) => {
        //accessToken is a token we receive from google to read user data
        //refresh token refreshes the access token
        //profile is the information that passport comes back with when it takes the code to google and brings back the profile information
        //done is called when we are done with this callback function

        // check if user already exists in our db
        User.findOne({ googleId: profile.id }).then((currentUser) => {
            if (currentUser) {
                // already have a user
                console.log('user is ' + currentUser);
                done(null, currentUser);
            } else {
                // create a new user and save to db
                new User({
                    username: profile.displayName,
                    googleId: profile.id

                }).save().then((newUser) => {
                    console.log('new user created' + newUser);
                    done(null, newUser);
                })
            }
        })
    })
)