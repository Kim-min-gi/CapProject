var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/data";



module.exports=()=>{ MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("data");

    dbo.collection("cro").aggregate([
        {
            "$group": {
                _id: {slug: "$tags"},
                slugs: { $addToSet: "$_id" } ,
                count: { $sum : 1 }
            }
        },
        {
            "$match": {
                count: { "$gt": 1 }
            }
        }
       ]).forEach(function(doc) {
          doc.slugs.shift();
          dbo.collection("cro").deleteMany({
            _id: {$in: doc.slugs}
          });
       })
       db.close();
    });

};
