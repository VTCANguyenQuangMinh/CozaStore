var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  console.log(req.session.User);
  res.render('shoping-cart', {
    user:req.session.User
  });
});

module.exports = router;
