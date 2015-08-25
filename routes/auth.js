// move this to index.js so our route isn't '/auth/' ?

var express = require('express');
var router = express.Router();
var passport = require('passport');
var async = require('async');
var bcrypt = require('bcrypt');
var models = require('../models'),
    User = models.User;

// Sign up
router.route('/signup').
  get(function(req, res, next) {
    res.sendStatus(405);
  }).
  post(function(req, res, next) {
    if(!req.body || !req.body.email || !req.body.password) {
      var err = new Error("No credentials.");
      return next(err);
    }

    async.waterfall([
      function(cb) {
        bcrypt.genSalt(16, cb);
      },
      function(salt, cb) {
        bcrypt.hash(req.body.password, salt, cb);
      },
      function(hash, cb) {
        User.create({
          email : req.body.email,
          password : hash
        }).then(function(user) {
          cb(null, user);
        }, cb);
      }
      // should also log a user in here
    ], function(err, result) {
      if(err) {
        return next(err);
      }

      res.sendStatus(201);
    });
  });

// Log in
  // this is the only route where Local Strategy will be invoked (by using .authenticate)

router.route('/login').
  get(function(req, res, next) {
    res.sendStatus(405);
  }).
  post(passport.authenticate('local', {
    successRedirect : '/',
    failureRedirect : '/' // it'll say 'Nobody' instead of your username
  }));


// Change password (maybe this should go into profiles.js? Think about positives / negatives)

module.exports = router;
