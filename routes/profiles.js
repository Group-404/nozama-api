var express = require('express');
var router = express.Router();
var models = require('../models/index');

// Should require authentication
//

router.route('/')
  .get(function(req, res, next) {
    res.send('Here are the profiles');
  })


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
    models.Profile.findById(req.params.id).then(function(profile){
      profile.getUser().then(function(user){
        res.send({user: user, profile: profile});
      });

    }, function(err){
      console.error(err);
    });
  })


// Update profile / user information
  .patch(function(req, res) {
    res.locals.profile.update(req.body).then(function(profile){
      // how
      res.send(profile);
    }, function(err){
      res.sendStatus(500);
    });
  })


// Delete profile / user information


module.exports = router;
