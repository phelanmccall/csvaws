var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("INDEX")
  res.render('index', { title: 'Challenge' });
});

module.exports = router;
