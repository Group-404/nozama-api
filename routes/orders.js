var express = require('express');
var router = express.Router();
var models = require('../models/index');

// Should require authentication

// Create an order

// Show all orders for a specific user
router.route('/:id')

  .get(function(req, res) {
    // will need to grab line items
    models.Order.findAll({
      where: {
        UserId : req.params.id
      }
    }).then(function(orders) {
      res.send(orders);
    }), function(err) {
      console.log(err);
    }
  })

module.exports = router;


