const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../database/Schema').User;
const shortid = require('shortid');

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

passport.use(
  'localRegister',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    function(req, email, password, done) {
      User.findOne(
        { $or: [{ email: email }, { username: req.body.username }] },
        function(err, user) {
          if (err) return done(err);
          if (user) {
            if (user.email === email) {
              req.flash('email', 'Email is already taken');
            }
            if (user.username === req.body.username) {
              req.flash('username', 'Username is already taken');
            }

            return done(null, false);
          } else {
            let user = new User();
            user.email = email;
            user.password = user.generateHash(password);
            user.username = req.body.username;
            user.stream_key = shortid.generate();
            user.save(function(err) {
              if (err) throw err;
              return done(null, user);
            });
          }
        }
      );
    }
  )
);

passport.use(
  'localLogin',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    function(req, email, password, done) {
      User.findOne({ email: email }, function(err, user) {
        if (err) return done(err);

        if (!user) {
          return done(null, false, req.flash('email', "Email doesn't exist."));
        }

        if (!user.validPassword(password)) {
          return done(
            null,
            false,
            req.flash('password', 'Oops! Wrong password.')
          );
        }

        return done(null, user);
      });
    }
  )
);

module.exports = passport;
