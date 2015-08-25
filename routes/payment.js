var express = require('express');
var router = express.Router();
var models = require('../models/index');

// Should require authentication?

router.route('/')
 // Get method not allowed
  .get(function(req, res, next) {
    res.sendStatus(405);
  })

  // Create lineItems using array of objects {product id, quantity} from CART
  // send req.body as JSON array
  .post(function(req, res, next){
  //   console.log(req.body);
  //   models.LineItem.bulkCreate(req.body).then(function(lineItems){
  //       res.json(lineItems);
  //     }, function(err){
  //       next(err);
  //   });
    models.LineItem.create(req.body).then(function(lineItem){
      res.json(lineItem);
      }, function(err){
        next(err);
    });

  });


module.exports = router;
