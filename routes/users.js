var express = require('express');
var soda = require('../dal/soda.js');

var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  var count = await soda.countAll();
  res.send('count is: ' + count);
});

module.exports = router;