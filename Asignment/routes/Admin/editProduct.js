var express = require('express');
var router = express.Router();
var Product = require('../../models/products');

/* GET home page. */
router.get('/', function(req, res, next) {
  
  Product.getAllProductsManagers((err, data)=>{
    res.render('Admin/editProduct',{
      products:data
    });
  })
  
});

module.exports = router;
