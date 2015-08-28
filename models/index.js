'use strict';

var Sequelize = require('sequelize');

var sequelize = new Sequelize(process.env.SQL_DB,
  process.env.SQL_USER,
  process.env.SQL_PASS,

  {
    host: process.env.SQL_HOST,
    port: process.env.SQL_PORT,
    dialect: 'postgres'
});

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nozama_mongo');

var models = {};

models.sequelize = sequelize;
models.User = sequelize.import('./user');
models.Profile = sequelize.import('./profile');
// models.Cart = require('./cart')(mongoose);
models.Order = sequelize.import('./order');
models.Product = sequelize.import('./product');
models.LineItem = sequelize.import('./lineitem');


// kept in case we want to use associate method to connect tables
// Object.keys(models).forEach(function(modelName) {
//  if ("associate" in models[modelName]) {
//    models[modelName].associate(models);
//  }
// });

models.User.hasOne(models.Profile, {onDelete: "cascade", hooks: true});
models.Profile.belongsTo(models.User);

models.Order.belongsTo(models.User);
models.User.hasMany(models.Order);

models.LineItem.belongsTo(models.Order);
models.Order.hasMany(models.LineItem);

models.LineItem.belongsTo(models.Product);
models.Product.hasMany(models.LineItem);


module.exports = models;
