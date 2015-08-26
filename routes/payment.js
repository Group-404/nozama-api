var express = require('express');
var router = express.Router();
var models = require('../models/index');
var async = require('async');
// Set your secret key: remember to change this to your live secret key in production
// See your keys here https://dashboard.stripe.com/account/apikeys
var stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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
        // IN PRODUCTION remove user id query
        models.User.findById(1).then(function(user){
          order.setUser(user).then(function(order){
            done(null, order);
          }, function(err){
            done(err);
          });
        });
      },
      // creates lineItems using JSON array of objects from cart
      // cart should be exact representation of lineItems
      function(order, done){
        // gives each item in cart an order id
        req.body.cart.forEach(function(item){
          item.OrderId = order.id;
        });

        models.LineItem.bulkCreate(req.body.cart).then(function(lineItems){
          // console.log(lineItems);
          done(null, lineItems);
        }, function(err){
          done(err);
        });
      },

      // calculate total cost of items
      function(lineItems, done){
        var total = 0;
        async.each(lineItems, function(item, next){
          item.getProduct().then(function(product){
            total += product.price * item.quantity;
            next();
          });
        }, function(err){
          if (err){
            done(err);
          } else {
            done(null,total);
          }
        });
      },

      // calculate amount incl tax and delivery
      function(total, done){
        var amount = total;
        var tax = 0.07;
        var shipping = 10;
        amount *= (1 + tax);
        amount += shipping;
        amount = Math.floor(amount * 100) // convert to cents, turn into integer
        done(null, amount);
      }

      // add to waterfall: create payment
      // function(amount, done){
      //   var stripeToken = request.body.stripeToken;
      //   // var description = request.body.description;

      //   stripe.charges.create({
      //     amount: amount, // amount in cents, again
      //     currency: "usd",
      //     source: stripeToken
      //     // description: description      //does it need this?
      //   }, function(err, charge) {
      //     if (err && err.type === 'StripeCardError') {
      //       console.log("The card has been declined");
      //     } else {
      //       console.log("Payment successful");
      //     }
      //   }).then(function(charge){
      //     done(null, charge);
      //   }, function(err){
      //     done(err);
      //   });
      // }

      ],function(err, result){ // error
        if (err) {
          return next(err);
        }
        res.json(result);
      }); // waterfall END

  }); // .post END


module.exports = router;
