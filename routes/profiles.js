var express = require('express');
var router = express.Router();
var models = require('../models/index');

// Should require authentication
//

router.route('/:id')
  // "before action" - grab profile id
  .all(function(req, res, next) {
    models.Profile.findById(req.params.id).then(function(profile){
      res.locals.profile = profile;
      next();
    }, function(err){
      next(err);
    })
  })

  .get(function(req, res){
    // models.Profile.findById(req.params.id).then(function(profile){
      res.locals.profile.getUser().then(function(user){
        res.send({user: user, profile: res.locals.profile});
      }), //;

    function(err){
      console.error(err);
    };
  })


// Update profile / user information
  .patch(function(req, res, next) {
    res.locals.profile.update(req.body).then(function(profile){
      // how can I allow a user to edit both their user and profile information at the same time?
      res.send(profile);
    }, function(err){
      res.sendStatus(500);
    });
  })

    // if (!req.user) {
    //   var err = new Error("Log in first.");
    //   return next(err);
    // }


// Delete profile / user information
  .delete(function(req, res, next) {
    res.locals.profile.destroy().then(function() {
      // not deleting user information with profile information
      res.send("Your account has been deleted.");
    }), function(err){
      console.error(err);
    };
  })


module.exports = router;
