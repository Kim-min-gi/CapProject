const mongoose = require('mongoose')



    var Schema = mongoose.Schema;

    var dataSchema = new Schema(
        { name : String, postalcode: String,phone1:String,phone2:String,addr:String,lat:String,long:String,outline:String,legacy:String,inquiry:String,dayon:String,dayoff:String,
            experience:String,experienceAge:String,persons:String,timeuse:String,time:String,parking:String,babycar:String,pet:String,credit:String,detail:String},
            {collection: 'data1'}
    );

  

module.exports = mongoose.model('data',dataSchema);