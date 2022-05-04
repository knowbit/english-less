var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

router.post('/', function(req, res, next) {
  const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true, useUnifiedTopology: true });
  mongoClient.connect(function(err, client){
    const db = client.db("usersdb");
    const collection = db.collection("users");
    collection.deleteOne({'_id': req.body.id}, function(err, result){
      if (err) console.log(err);
      res.send(result);
      client.close();
    });
  });
});

module.exports = router;
