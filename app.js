var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');
var uuid = require('uuid');
var MongoStore = require('connect-mongo')(session);
process.env.SESSION_SECRET || require('dotenv').load();
var passport = require('./lib/passport');

var routes = require('./routes/index');
// should this be profile singular?
var profiles = require('./routes/profiles');
// var auth = require('./routes/auth')

var orders = require('./routes/orders');
// var products = require('./routes/products');
// need to add authentication routes here?

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(cors());




// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret : process.env.SESSION_SECRET,
  resave : false,
  saveUninitialized : true,
  // saveUninitialized : false, // don't create a session until something is stored
      // commented above out because we prob want sessions without user data
  store : new MongoStore({
    url : "mongodb://localhost/nozama/sessions" // will we move this off localhost later?
  }),
  cookie : {
    maxAge : 300000 // 5 minutes
    // req.session.cookie.expires = false; // cookie is currently set to not expire
  },
  genid : function(req) { // generates a new session id
    return uuid.v4({
      rng : uuid.nodeRNG
    });
  }
}));

// put product routes here
// app.use('/products', products);

// finds the passport.user attached to the session. if it doesn't find it (aka the user is not yet authenticated), it creates it like req.passport.user = {}
app.use(passport.initialize());
// If it finds a serialized user object in the session, it will consider the request authenticated.
app.use(passport.session());
// passport. session


app.use('/', routes);
app.use('/profiles', profiles);
app.use('/orders', orders);

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
  // res.render is producing html
  // look at js express multer repo for this last 2 functions
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
