var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://user1:1234@cluster0.9hxjc.mongodb.net/data?retryWrites=true&w=majority";



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
