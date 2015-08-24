'use strict';

var Sequelize = require('sequelize');

var sequelize = new Sequelize('nozama_app', 'group404', 'abc', {
 host: "localhost",
 port: 5432,
 dialect: 'postgres'
});

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nozama_mongo');

var models = {};
models.User = sequelize.import('./user');
models.Profile = sequelize.import('./profile');
models.Cart = sequelize.import('./cart');
models.Order = sequelize.import('./order');
models.Product = require('./product')(mongoose);

// Object.keys(models).forEach(function(modelName) {
//  if ("associate" in models[modelName]) {
//    models[modelName].associate(models);
//  }
// });

sequelize.sync();

module.exports = models;
