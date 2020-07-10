var express = require('express');
var fs = require('fs');
var router = express.Router();
var Product = require('../../models/products');

router.get('/:id', function(req, res, next){
    var PrId = req.params.id.slice(1);
    Product.findOneAndUpdate({_id:PrId}, {status: 'deactive'}, ()=>{});
    res.redirect('/editProduct');
})


module.exports = router;