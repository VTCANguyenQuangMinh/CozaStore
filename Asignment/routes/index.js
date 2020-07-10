var express = require('express');
var router = express.Router();
var Category = require('../models/categories');
var Product = require("../models/products");

/* GET home page. */
router.get('/', function(req, res, next) {

  Product.getProducts(16, (err2, products)=>{
    Category.findAll((err3, data)=>{
      res.render('index', { 
        Category: data,
        Products: products,
        user:req.session.User
      });
    })
  })

});


module.exports = router;