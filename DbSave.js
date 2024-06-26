const mongodb = require("mongodb").MongoClient;
const csvtojson = require("csvtojson");

// let url = "mongodb://username:password@localhost:27017/";
let url = "mongodb://localhost:27017/data";


var save = csvtojson()
  .fromFile("insta.csv")
  .then(csvData => {
    console.log(csvData);

    mongodb.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, client) => {
        if (err) throw err;

        client
          .db("data")
          .collection("cro")
          .insertMany(csvData, (err, res) => {
            if (err) throw err;

            console.log(`Inserted: ${res.insertedCount} rows`);
            client.close();
          });
      }
    );
  });


  module.exports = save;
