var express = require('express');
var router = express.Router();
const cookieParser = require("cookie-parser");
const User = require('../model/user');
const jwt = require("jsonwebtoken");
var mongoose = require('mongoose');
let secretObj = require("../config/jwt");











router.get('/',async function(req,res){

     var isOwner =false;
    if(req.cookies.token){
      var cookies = req.cookies.token
      //1.검증을 한후 유저를 검색  2. 유저의 아이디를 추출 아이디 값을 프론트엔드에 뿌려주기
      jwt.verify(cookies, secretObj.secret, (error, decoded) => {
        
        if (error) {
          return res
            .status(500)
            .json({ error: "token을 decode하는 데 실패 했습니다." });
        }
        // decoded에는 jwt를 생성할 때 첫번째 인자로 전달한 객체가 있습니다.
        // { random: user._id } 형태로 줬으므로 _id를 꺼내 씁시다
        User.findOne({ user_id: decoded.id }, (error, user) => {
          if (error) {
            return res.json({ error: "DB에서 찾는 도중 오류가 발생했습니다" });
          }
          if (!user) {
                //return isAuth = false;
              return res
              .status(404)
              .json({ error: "token에 해당하는 유저가 없습니다" }); 
          }
          if (user) {
               
               res.render('main',{user:user.user_id});
            //return isAuth = true;
          }
        });
      });
  
  
    }else{
      console.log(cookies);
    
      res.render('main',{user:isOwner});
    }
    
  
  })


router.get('/listsearch',function (req,res) {
     
   
    var ser = req.query.search;
    

   
             
    res.render('list.ejs',{ser:ser});


});




module.exports = router;

