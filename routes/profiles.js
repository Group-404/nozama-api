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

// can't get user and profile to render together
  .get(function(req, res){
    models.Profile.findById(req.params.id).then(function(profile){
      // res.json(req.params.id);
      profile.getUser().then(function(user){
        res.send(user);
        // res.send(profile, user);
      });

    }, function(err){
      console.error(err);
    });
  })


// Update profile / user information



// Delete profile / user information


module.exports = router;
