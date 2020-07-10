var express = require('express');
var router = express.Router();
var Product = require("../models/products");
var Customer = require('../models/customers');

router.get('/:id', function(req, res, next) {
  var PrId = req.params.id.slice(1);

  Product.findProductByID(PrId, (err, data)=>{
    res.render('product-detail', {
      productDetail : data,
      user:req.session.User
    });
  })
  
});

router.post('/', (req, res, next)=>{
  if(req.session.User){

    var Cart = {
      productID:req.body.idPr,
      quantity:req.body.numproduct,
      size:req.body.size,
      color:req.body.color
    }
    var newCart = [];
    var newSScart = {
      color:req.body.color,
      size:req.body.size,
      quantity:req.body.numproduct,
    }

    Product.findProductByIDCus(req.body.idPr, (err, data)=>{
      newSScart.idPr = data._id;
      newSScart.name = data.name;
      newSScart.price = data.price;
      newSScart.description = data.description;
      newSScart.img = data.imgLink;

    })
    setTimeout(() => {
      req.session.User.cart.push(newCart);
    }, 50);
    

    Customer.findCustomerByID(req.session.User.id, (err, data)=>{
      
      data.cart.push(Cart);
      newCart = data.cart;
    })

    setTimeout(() => {
      Customer.findOneAndUpdate({_id:req.session.User.id}, {cart:newCart}, ()=>{});
    }, 150);
  
    setTimeout(() => {
      Product.findProductByID(req.body.idPr, (err, data)=>{
        res.render('product-detail', {
          productDetail : data,
          user:req.session.User
        });
      })
    }, 1000);
    

    
  }else{
    res.redirect('/loginForm');
  }
})

module.exports = router;