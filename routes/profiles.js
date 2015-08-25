var express = require('express');
var router = express.Router();
var models = require('../models/index');

// Should require authentication
//

router.route('/')
 // Get profile / user information
  .get(function(req, res, next) {
    res.send('Here are the profiles');
  })

  // res.json(req.user.profile)

  // Create profile (not user information like email and password)

 //  .post(function(req, res, next){

 //    var blankProfile = { // when a user creates an account, a blank profile will be associated with it
 //      lastName: '',
 //      firstName: '',
 //      addressOne: '',
 //      addressTwo: '',
 //      // drop tables so I don't have to include addressTwo here
 //      city: '',
 //      state: '',
 //      zipCode: '',
 //      phoneNumber: ''
 //    }

 //    models.Profile.create(blankProfile).then(function(profile){
 //      res.json(profile);
 //      // call this after a user is created - associate this blank profile with the user that was just created - getUser()?
 //    }, function(err) {
 //      next(err);
 //    });

 //    // res.send(req.params);
 //    // res.send("We created a profile!");
 //    // models.user.js.create(req.body).then(function(user){
 //    //  res.json(cat);
 //   //   function(err) {
 //   //   console.log(err);
 //   // }
 // });

// Update profile / user information

// Delete profile / user information



// // POST new user
// router.post('/', function(req, res){
//   res.send()
// })

module.exports = router;
