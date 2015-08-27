var express = require('express');
var router = express.Router();
var models = require('../models/index');
var async = require('async');

// Should require authentication

// Create an order

// Show all orders for a specific user
router.route('/')

  // .get(function(req, res, next) {
  //   // will need to grab line items
  //   models.Order.findAll({
  //     where: {
  //       UserId : req.params.id
  //     }
  //   }).then(function(orders) {
  //     res.send(orders);
  //   }), function(err) {
  //     next(err);
  //   }
  // })

  .get(function(req, res, next) {
    // var finalOrders;
    var finalLineItems = [];
      async.waterfall([
        function(done) {
          models.Order.findAll({
            where: {
              UserId : req.user.id
            }
          }).then(function(orders) {
            // finalOrders = orders;
            console.log('result of the first waterfull function' + orders);
            done(null, orders);
          }).catch(done)
        },
        function(orders, done) {
          async.map(orders, function(order, cb) {
            order.getLineItems().then(function(lineItems) {
              finalLineItems.push(lineItems);
              cb(null, order)
            });
          }, function(err, results){
            console.log('result of the iteration' + results);
            if (err) {
              done(err);
            } else {
              done(null, results);
            }
          });
        }
      ], function(err, results) {
        if (err) {
          next(err);
        } else {
          res.json({orders: finalLineItems});
        }
      })

  });


module.exports = router;


