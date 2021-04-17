const mongoose = require('mongoose')
var Schema = mongoose.Schema;

const userSchema = new Schema(
  { user_id  : {type:String,required:true, unique:true},
   user_password : {type:String, required:true},
   user_name: {type:String, required:true},
   user_email : {type:String,required:true,unique : true},
   user_birth : {type:String,require:true},
   },{versionKey:false},
   {collection: 'users'}
);




module.exports = mongoose.model('users',userSchema);