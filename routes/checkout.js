var express = require('express');
var router = express.Router();
var models = require('../models/index');

// Should require authentication?

router.route('/')
 // Get method not allowed
  .get(function(req, res, next) {
    res.sendStatus(405);
  })

  // Create lineItems using product id, quantity from CART
  .post(function(req, res){
    // res.send("We created lineItems");
    models.LineItem.create(req.body).then(function(lineItem){
        res.json(lineItem);
      }, function(err){
        console.log(err);
    });
  });


module.exports = router;
