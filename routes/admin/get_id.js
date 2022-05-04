var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
// const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true, useUnifiedTopology: true });

/* GET home page. */
router.get('/', function(req, res, next) {
  const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true, useUnifiedTopology: true });
  mongoClient.connect(function(err, client){
    const db = client.db("usersdb");
    const collection = db.collection("users");
    collection.distinct('_id', function(err, results){
      // console.log(results);
      res.send(results);
      client.close();
    });
  });
});

module.exports = router;
