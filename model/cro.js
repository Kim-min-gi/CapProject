const mongoose = require('mongoose')
var Schema = mongoose.Schema;




var croSchema = new Schema(
    { index:String,content:{type:String, unique : true} ,data:String,like:String,place:String,tags:String},
    {collection: 'cro'}
);






module.exports = mongoose.model('cro1',croSchema);