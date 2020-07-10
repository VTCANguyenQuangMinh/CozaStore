var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home-03', { user:req.session.User });
});

module.exports = router;
