var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contact', {
    user:req.session.User
  });
});

module.exports = router;
