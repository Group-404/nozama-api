var express = require('express');
var router = express.Router();

// Should require authentication

router.route('/')
 // Get method not allowed
  .get(function(req, res, next) {
    res.sendStatus(405);
  })

  // Create lineItems using product id, quantity from CART
  .post(function(req, res){
    res.send("We created lineItems");
    // models.user.js.create(req.body).then(function(user){
    //  res.json(cat);
   //   function(err) {
   //   console.log(err);
   // }
 });


module.exports = router;
