const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model');


passport.use(
    new GoogleStrategy({
        // options for the strategy
        callbackURL: '/auth/google/redirect',
        // client id and client secret
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
        //this is what fired when the user goes to login with their profile
    }, (accessToken, refreshToken, profile, done) => {
        //accessToken is a token we receive from google to read user data
        //refresh token refreshes the access token
        //profile is the information that passport comes back with when it takes the code to google and brings back the profile information
        //done is called when we are done with this callback function

        // passport callback function
        console.log('passport callback function fired')
        console.log(profile)

        // create a new user and save to db
        new User ({
            username: profile.displayName,
            googleId: profile.id

        }).save().then((newUser) => {
            console.log('new user created' + newUser)
        })
    })
)