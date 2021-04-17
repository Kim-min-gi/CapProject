const mongoose = require('mongoose')
var Schema = mongoose.Schema;




var arraySchema = new Schema(
    { name:{type:String,
            trim: true
    }},
    {collection: 'array'}
);



module.exports = mongoose.model('array',arraySchema);