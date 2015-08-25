var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
require('dotenv').load();

// Set your secret key: remember to change this to your live secret key in production
// See your keys here https://dashboard.stripe.com/account/apikeys
var stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

var routes = require('./routes/index');
// should this be profile singular?
var profiles = require('./routes/profiles');
// var orders = require('./routes/orders');
// var products = require('./routes/products');
var payment = require('./routes/payment');
// need to add authentication routes here?

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', routes);
app.use('/profiles', profiles);
// app.use('/orders', orders);
// app.use('/products', products);
app.use('/payment', payment);
// need to add authentication routes here?

////////STRIPE//////////
// should try to modularize all stripe functionality
// Get the credit card details submitted by the form
// var stripeToken = request.body.stripeToken;
// // need to pull amount from backend, not frontend
// var amount = request.body.amount;
// var description = request.body.description;

// var charge = stripe.charges.create({
//   amount: amount, // amount in cents, again
//   currency: "usd",
//   source: stripeToken,
//   description: description
// }, function(err, charge) {
//   if (err && err.type === 'StripeCardError') {
//     console.log("The card has been declined");
//   } else {
//     console.log("Payment successful");
//   }
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
