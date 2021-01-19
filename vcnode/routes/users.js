var express = require('express');
var router = express.Router();


/* User dashboard. */
router.get('/dashboard', function(req, res, next) {
  res.render('users/dashboard', {title:'Express'});
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
