var express = require('express');
var dbHandler = require('../model/dbHandler');
var router = express.Router();

var mongoose = require('mongoose');
var wiki = mongoose.model('wiki');



router.get('/wiki/:searchString', function(req, res) {
  var searchString = req.params.searchString;
  /*console.log("searchString: " + searchString);*/
  if(typeof global.mongo_error !== "undefined"){
    res.status(500);
    res.end("Error: "+global.mongo_error+" To see a list of wikis here, make sure you have started the database and set up some test wikis (see model-->db.js for instructions)");
    return;
  }
  dbHandler.findWiki(searchString.toLowerCase(), function(wikis) {
    /*console.log(wikis);*/
    res.header("Content-type","application/json");
    res.end(JSON.stringify(wikis));
  })
});

router.get('/wikicategories', function(req, res) {
  if(typeof global.mongo_error !== "undefined"){
    res.status(500);
    res.end("Error: "+global.mongo_error+" To see a list of wikis here, make sure you have started the database and set up some test wikis (see model-->db.js for instructions)");
    return;
  }
  dbHandler.getCategories(function(wikis) {
    res.header("Content-type","application/json");
    res.end(JSON.stringify(wikis));
  })
});

router.get('/wikicategories/:category', function(req, res) {
  var category = req.params.category;
  if(typeof global.mongo_error !== "undefined"){
    res.status(500);
    res.end("Error: "+global.mongo_error+" To see a list of wikis here, make sure you have started the database and set up some test wikis (see model-->db.js for instructions)");
    return;
  }
  dbHandler.getWikisWithCategory(category, function(wikis) {
    console.log(wikis);
    res.header("Content-type","application/json");
    res.end(JSON.stringify(wikis));
  })
});

/* GET A User From The DataBase */
router.get('/:wiki', function(req, res) {
  var wiki = req.params.wiki;
  if(typeof global.mongo_error !== "undefined"){
    res.status(500);
    res.end("Error: "+global.mongo_error+" To see a list of wikis here, make sure you have started the database and set up some test wikis (see model-->db.js for instructions)");
    return;
  }

  dbHandler.getWiki(wiki, function(wikis) {
   /* console.log("List of wikis: " + wikis);*/
    res.header("Content-type","application/json");
    res.end(JSON.stringify(wikis));
  })
});

module.exports = router;
