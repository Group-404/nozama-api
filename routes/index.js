'use strict';

var express = require('express');
var router = express.Router();
var passport = require('passport');
var bodyParser = require('body-parser');
var async = require('async');
var bcrypt = require('bcrypt');
var models = require('../models/index'),
    User = models.User,
    Profile = models.Profile;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

////////// AUTH ROUTES //////////

// SIGN UP
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
        models.sequelize.transaction(function transactionCallback(t) {
          return User.create({
            email : req.body.email,
            password : hash
            }, {
            transaction: t
          }).then(function userCreateCallback(user) {
            return Promise.all([Promise.resolve(user), Profile.create({
              // creates profile - not yet associated to a user
              lastName: '',
              firstName: '',
              addressOne: '',
              addressTwo: '',
              // drop tables so I don't have to include addressTwo here
              city: '',
              state: '',
              zipCode: '',
              phoneNumber: ''
            }, {transaction: t})]);
          }).then(function profileCreateCallback(userProfileArray) {
            // associates userId to profile that was just created
            return userProfileArray[0].setProfile(userProfileArray[1], {transaction: t});
          });
        }).then(function userSetProfileCallback(user) {
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


// LOG IN
router.route('/login').
  get(function(req, res, next) {
    res.sendStatus(405);
  })
  .all(function(req,res, next){
    console.log(req.body.email);
    console.log(req.body.password);
    next();
  })
  .post(passport.authenticate('local'), function(req, res){
    req.user.getProfile().then(function(profile){
      res.locals.profile = profile;
      res.json({user: req.user, profile: res.locals.profile});
    }, function(err){
      console.log(err);
    })
  });


// DISPLAY USER & PROFILE
router.route('/displayAccount')
  .get(function(req, res){
    req.user.getProfile().then(function(profile){
      res.send({user: req.user, profile: profile});
    }, function(err){
      next(err);
    });
  });


// sequilize.user.update({email: "blah"}) // postman
// sequilize.user.update({user: { email: "blah"}}) // ajax

// UPDATE USER & PROFILE
router.route('/updateAccount')
  .patch(function(req, res){
    req.user.update({email: req.body.user.email}).then(function(user){    // Update User
      user.getProfile().then(function(profile){         // Get Profile
        profile.update({lastName: req.body.profile.lastName,
                        firstName: req.body.profile.firstName,
                        addressOne: req.body.profile.addressOne,
                        addressTwo: req.body.profile.addressTwo,
                        city: req.body.profile.city,
                        state: req.body.profile.state,
                        zipCode: req.body.profile.zipCode,
                        phoneNumber: req.body.profile.phoneNumber
        }).then(function(){         // Update Profile
          res.send({user: user, profile: profile});
        }, function(err){
          next(err);
        });
      }, function(err){
        next(err);
      })
    });
  });


// DESTROY USER & PROFILE
router.route('/deleteAccount')
  .delete(function(req, res, next) {
    req.user.destroy().then(function() {
      res.send("Your account has been deleted.");
    }), function(err){
      console.error(err);
    };
  });


// LOG OUT
router.route('/logout').
  all(function(req, res, next) {
    // if (!req.user) {
    //   var err = new Error("Log in first.");
    //   return next(err);
    // }
    req.logout();
    res.sendStatus(200);
  });


// CHANGE PASSWORD
router.route('/changePassword').
  get(function(req, res, next) {
    res.sendStatus(405);
  }).

  put(function(req, res, next) {
    // console.log(req.body);
    // console.log(req.user);
    // console.log(req.body.password);
    if(!req.body || !req.user || !req.body.password) {
      var err = new Error("No credentials.");
      return next(err);
    }

    async.waterfall([
      function(cb) {
        bcrypt.genSalt(16, cb);
      },
      function(salt, cb) {
        bcrypt.hash(req.body.password, salt, cb);
        debugger;
      },
      function(hash, cb) {
        req.user.update({
          password : hash
        }).then(function(user) {
          cb(null, user);
        }).catch(cb);
      }
    ], function(err, result) {
      if(err) {
        return next(err);
      }

      res.sendStatus(201);
    });
  });


module.exports = router;
