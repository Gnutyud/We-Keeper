const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require('passport-facebook').Strategy
const User = require("../models/User");

const configGoogleAuth = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        scope: ["profile", "email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        //get the user data from google
        const newUser = {
          googleId: profile.id,
          username: profile.displayName,
          avatar: profile.photos[0].value,
          email: profile.emails[0].value,
          source: "google",
        };

        try {
          //find the user in our database
          let user = await User.findOne({ googleId: profile.id });

          if (user) {
            //If user present in our database.
            done(null, user);
          } else {
            // if user is not preset in our database save user data to database.
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );

  // used to serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};

const configFacebookAuth = (passport) => {

  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "/auth/facebook/callback",
    state: true,
    profileFields: ['id', 'displayName', 'picture.type(large)', 'email']
  },
    async (accessToken, refreshToken, profile, done) => {
      const profileObj = profile._json;
      const newUser = {
        facebookId: profileObj.id,
        username: profileObj.name,
        avatar: profileObj.picture.data.url,
        email: profileObj.email,
        source: "facebook",
      };
      try {
        //find the user in our database
        let user = await User.findOne({ facebookId: profileObj.id });
        console.log("user", user)
        if (user) {
          //If user present in our database.
          done(null, user);
        } else {
          // if user is not preset in our database save user data to database.
          user = await User.create(newUser);
          done(null, user);
        }
      } catch (err) {
        console.error(err);
      }
    }
  ));

  // Passport session setup.
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (id, done) {
    done(null, id);
  });
}

module.exports = { configGoogleAuth, configFacebookAuth };
