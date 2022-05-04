var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

/* GET home page. */
router.post('/', function(req, res, next) {
  const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true, useUnifiedTopology: true });
  mongoClient.connect(function(err, client){
    const db = client.db("usersdb");
    const collection = db.collection("users");
    collection.distinct('_id', function(err, list){
      if (err) console.log(err);
      console.log(req.body.id);
      let less = rand_lesson(req.body.id, list)
      collection.find({'_id': less}).toArray(function(err, result) {
        if (err) console.log(err);
        res.send(result);
        client.close();
      });
    });
  });
});

function rand_lesson(client_id, db_list) {
  let num = 0;

  if (db_list.length > 1) {
    for (let i = 0; i < 10; i++) {
      num = getRandomInt(0, db_list.length);
      if (client_id === db_list[num]) {
        continue;
      } else return db_list[num];
    }
    return db_list[num];
  } else return db_list[num];
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

module.exports = router;
