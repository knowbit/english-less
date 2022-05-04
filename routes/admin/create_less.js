var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true, useUnifiedTopology: true });

router.post('/', function(req, res, next) {
  const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true, useUnifiedTopology: true });
  mongoClient.connect(function(err, client){
    const db = client.db("usersdb");
    const collection = db.collection("users");
    collection.save({_id: req.body.name, words: req.body.words}, function(err, result){
      if (err) console.log(err);
      res.send('result');
      client.close(); 
    });
  });
});

module.exports = router;
