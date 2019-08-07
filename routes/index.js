var express = require('express');
var soda = require('../dal/soda.js');

var router = express.Router();

router.get('/:docType', async function(req, res, next) {
  var result = await soda.findAll(req.params.docType);
  res.send(result);
});

router.get('/:docType/:id', async function(req, res, next) {
  var result = await soda.findById(req.params.id, req.params.docType);
  if(result){
    res.send(result);
  } else {
    res.statusCode = 404;
    res.send();
  }
});

router.post('/:docType', async function(req, res) {
  var result = await soda.insertDocument(req.body, req.params.docType);
  if(result){
    res.statusCode == 201;
  }
  res.send(result);
})

router.put('/:docType/:id', async function(req, res, next) {
  var result = await soda.updateDocument(req.params.id, req.body, req.params.docType);
  if(result){
    res.send(result);
  } else {
    res.statusCode = 404;
    res.send();
  }
});

router.delete('/:docType/:id', async function(req, res, next) {
  var result = await soda.deleteById(req.params.id, req.params.docType);
  if(result){
    res.send(result);
  } else {
    res.statusCode = 404;
    res.send();
  }
});

module.exports = router;
