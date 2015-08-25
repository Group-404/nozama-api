var express = require('express');
var router = express.Router();

// Should require authentication
//

router.route('/')
 // Get profile / user information
  .get(function(req, res, next) {
    res.send('Here are the profiles');
  })

  // res.json(req.user.profile)

  // Create profile (not user information like email and password)
  .post(function(req, res){
    res.send("We created a profile!");
    // models.user.js.create(req.body).then(function(user){
    //  res.json(cat);
   //   function(err) {
   //   console.log(err);
   // }
 });

// Update profile / user information

// Delete profile / user information



// // POST new user
// router.post('/', function(req, res){
//   res.send()
// })

module.exports = router;
