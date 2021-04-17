var express = require('express');
var router = express.Router();
const User = require('../model/user');
var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
let secretObj = require("../config/jwt");
//var path = require('path');

const saltRounds = 10;

function testing(var1){
        return User.findOne({user_id:var1}).exec();
}


router.get('/',function (req,res) {

    

        res.render('login/login'); 

    
});


router.post('/login_process',async function(req,res, next){
        try{
             let id  =req.body.id;
             let pw = req.body.pw;
        
             let user = await testing(id);
        
             if(!user){
                     console.log('로그인실패')
                     res.redirect('/login');
             }
        
             if(user){
        
                bcrypt.compare(pw,user.user_password, function(err, result) {
                        if(!result){
                                console.log('비밀번호 비일치');
                                res.redirect('/login');
        
                        }else{
                                console.log('비밀번호 일치');
                                const token = jwt.sign({id:user.user_id},secretObj.secret,{expiresIn: '4h'});
                                return res
                                .cookie("token", token, {
                                 maxAge: 4000 * 60 * 60, // 4시간 유지
                                httpOnly: true,
                                })
                                .status(200)
                                .redirect('/');
                                
                        }
        
                })
        
             }
        
        }catch{
            console.log(err)
        }
        
        
        
        
        })

/* 
router.post('/',async function(req,res,next) {
try{
     let ID = req.body.id;
     let PW = req.body.pw;
     //유저 찾기
     let user= await testing(ID);

     let dbPW = user.user_password;
     console.log(ID)
     console.log(PW)
       bcrypt.compare(PW,dbPW , function(err, result) {
        if(result){
                //로그인 완료!
                console.log('비밀번호 일치')
                res.json('1')
                     
                
                //세션
                //res.redirect res.render 알아보기!!!
        }else{
                //로그인 실패!
                console.log('비밀번호 불일치')
                res.json('2')
                //res.redirect
        }
        
                });  
       
}catch(err){
                console.log(err);
                
               
        } 

    
}) */






module.exports = router;