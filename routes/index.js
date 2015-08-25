var express = require('express');
var router = express.Router();
var passport = require('passport');
var bodyParser = require('body-parser');
var async = require('async');
var bcrypt = require('bcrypt');
var models = require('../models/index');
    User = models.User;

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

// LOG IN
router.route('/login').
  get(function(req, res, next) {
    res.sendStatus(405);
  }).
//  post(function(req, res, next) {
//   passport.authenticate('local', function(err, user, info) {
//     if (err) { return next(err); }
//     if (!user) { return res.redirect('/login'); }
//     req.logIn(user, function(err) {
//       if (err) { return next(err); }
//       // return res.redirect('/users/' + user.username);
//       return res.send(user);
//     });
//   })(req, res, next);
// });
  post(passport.authenticate('local'), function(req, res){
    res.json(req.user);
  });

router.route('/fail').
  all(function(req, res, next) {
    res.send('No such luck');
  })


// CHANGE PASSWORD (maybe this should go into profiles.js?
router.route('/changePassword').
  get(function(req, res, next) {
    res.sendStatus(405);
  }).
  put(function(req, res, next) {
    console.log(req.body);
    console.log(req.user);
    console.log(req.body.password);
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
        // students will make error handler
        return next(err);
      }

      res.sendStatus(201);
    });


  });

router.route('/logout').
  all(function(req, res, next) {
    if (!req.user) {
      var err = new Error("Log in first.");
      return next(err);
    }
    req.logout();
    res.sendStatus(200);
  });


module.exports = router;
