var express = require('express');
var router = express.Router();
var models = require('../models/index');
var async = require('async');

// Should require authentication?

router.route('/')
 // Get method not allowed
  .get(function(req, res, next) {
    res.sendStatus(405);
  })

  .post(function(req, res, next){
    // if user is logged in -- do I check for userid in session?

    async.waterfall([
      // creates order
      function(done){
        models.Order.create({}).then(function(order){
          // facilitates handoff between this funciton and the next
          done(null, order);
        }, function(err){
          done(err);
        });
      },
      function(order, done){
        // set order's user id to current user's id
        models.User.findById(1).then(function(user){
          order.setUser(user).then(function(order){
            done(null, order);
          }, function(err){
            done(err);
          });
        })

      },
      //creates lineItems using JSON array of objects from
      // cart should be exact representation of lineItems
      function(order, done){
        // var items = JSON.parse(req.body.cart);
        req.body.cart.forEach(function(item){
          item.OrderId = order.id;
        });

        models.LineItem.bulkCreate(req.body.cart).then(function(lineItems){
          console.log(lineItems);
          done(null, {order: order, lineItems: lineItems});
        }, function(err){
          done(err);
        });
      }
      ],function(err, result){
        if (err) {
          return next(err);
        }
        res.json(result);
      }); // waterfall END

    // add to waterfall: calculate total

    // add to waterfall: create payment

  });


module.exports = router;
