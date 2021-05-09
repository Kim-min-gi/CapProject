var express = require('express');
var router = express.Router();
const User = require('../model/user');
var mongoose = require('mongoose');
//const bcrypt = require('bcrypt');
const bcrypt = require("bcryptjs");
const nodemailer = require('nodemailer');



const saltRounds = 10;
const someOtherPlaintextPassword = 'not_bacon';



router.post('/',function(req,res,next){

    try{
        const myPlaintextPassword = req.body.password;

        bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {

            const user = new User({
                user_id:req.body.id,
                user_password:hash,
                user_name:req.body.name,
                user_email:req.body.email1+'@'+req.body.email2,
                user_birth:req.body.birth
              });
              user.save(); 
    
        });

        
            res.render('login/complete');

    }catch(err){

        next(err);

    } 


})



module.exports = router;