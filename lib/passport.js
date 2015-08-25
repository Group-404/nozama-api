var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');

var models = require('../models'),
    User = models.User;

// explain this
// when you're serializing the user, it's determining what data from the user object should be stored in the session
// The result of serializeUser is attached to the session as req.session.passport.user (aka our serialized user object)  // is this always correct?
// this is allowing us to specify what user information will be stored in the session
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
// sets current user


// retrieves current user
// is id in the parameters referring to the id returned from serializeUser? Is this some kind of magic with passport.initialize()?
// what does deserialize mean? How does this differ from Local Strategy?
// this is invoked on every request by passport.session. Enables us to load additional user information on every request.
// gives me req.user
passport.deserializeUser(function(id, done) {
  // where are we looking for a user? Users are in psql, not mongo (isn't .findOne a mongo method?)
  User.findOne({
    where : {
      // find a user where the user id of the logged-in user matches a user in the Users table
      id : id
    }
  }).then(function(user) {
    // gets the user information
    // so this is storing the entire user object in the session?
    done(null, user);
    // this user becomes req.user
    // is there additional stuff we could be doing here - like retrieving profile information?
    // this prevents a trip to the db on every request just to fetch user information
  }).catch(function(err) {
    done(err);
  });
});

// Local Strategy allows us to authenticate users by looking up their data in the db
// Why would we have more than one Local Strategy?
// this has to do with logging in, not registering
var localStrat = new localStrategy(function(email, password, done) {
  User.findOne({
    where : {
      // find a user whose email in our db matches the logged in user
      email : email
      // we don't need to put password there?
    }
  }).then(function(user) {
    if (!user) {
      return done(null, false);
    }
    bcrypt.compare(password, user.password, function(err, match) {
      if (err) {
        return done(err);
      }
      done(null, match ? user : false);
    });
  }).catch(function(err) {
    done(err);
  });
});

passport.use(localStrat);

module.exports = passport;
