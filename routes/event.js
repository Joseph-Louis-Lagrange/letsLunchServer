var express = require('express');
var soda = require('../dal/soda.js');

var router = express.Router();

const docType = "event";

router.get('/', async function(req, res, next) {
  var result = await soda.findAll(docType);
  res.send(result);
});

router.get('/:id', async function(req, res, next) {
  var result = await soda.findById(req.params.id, docType);
  if(result){
    res.send(result);
  } else {
    res.statusCode = 404;
    res.send();
  }
});

router.post('/', async function(req, res) {
  var result = await soda.insertDocument(req.body, docType);
  if(result){
    res.statusCode == 201;
  }
  res.send(result);
})

router.put('/:id', async function(req, res, next) {
  var result = await soda.updateDocument(req.params.id, req.body, docType);
  if(result){
    res.send(result);
  } else {
    res.statusCode = 404;
    res.send();
  }
});

router.delete('/:id', async function(req, res, next) {
  var result = await soda.deleteById(req.params.id, docType);
  if(result){
    res.send(result);
  } else {
    res.statusCode = 404;
    res.send();
  }
});

module.exports = router;