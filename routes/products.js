var express = require('express');
var models = require('../models/index');
var router = express.Router();

// Should NOT require authentication

// Show all products (/products)

// Show one products (/products/:id)

router.get('/:id', function(req, res) {
  models.Product.findById(req.params.id).then(function(product){
    console.log('req.params.id is:' +req.params.id + 'and product is: ' + product);

    res.json(product);
  }, function(err){
    console.error(err);
  });
  // res.send("pets#show");
});

module.exports = router;
