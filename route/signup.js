var express = require('express');
var router = express.Router();
const User = require('../model/user');
var mongoose = require('mongoose');
//const bcrypt = require('bcrypt');
const bcrypt = require("bcryptjs");
const nodemailer = require('nodemailer');
let secretObj = require("../config/jwt");


function Checkemail(vla){
  const CHe = User.findOne({user_email:vla}).exec();
           return CHe; 
 };

let randomNumber = Math.floor(Math.random()*1000000)+100000;
if(randomNumber>1000000){
 randomNumber = randomNumber - 100000
}
       



function userFind(value){
    return User.find({user_id:value}).exec();
};

const createUserSchema = async function(userInput){
    const user = await userWithEncodePassword(userInput);
    return user.save();
};



router.get('/',function (req,res) {

    res.render('login/signup');


}); 


router.post('/',async function (req,res,next){
 
  try{
    let userid =req.body.id;                 //이부분을 보면 가입 성공 했을때와, 아이디 중복 체크가 나중에 나뉨.
    console.log(userid);                     //나눠야함.
    const user = await userFind(userid);
    console.log(user);
    if(user.length===0){
        console.log('아이디 사용가능')
        res.json('1');
       // await createUserSchema(req.body);
    }else{
        res.json('2') // 아이디 중복
    }
    
}catch(err){

    next(err);

} 

})

router.post("/:email",async function(req, res, next){
    //이메일 빈 공간 제거
  let email0 = req.body.email;
  console.log(email0);
  let email2 = email0.replace(/ /gi, "");
  console.log(email2);

   
  const CHECK = await Checkemail(email2);
  if(CHECK===null){
    console.log('아이디 생성가능!')
      //이메일 설정
   let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kmg30234@gmail.com',  // gmail 계정 아이디를 입력
      pass: secretObj.pass          // gmail 계정의 비밀번호를 입력
    }
  });

  let mailOptions = {
    from: 'kmg30234@gmail.com',    // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
    to: email2 ,                     // 수신 메일 주소
    subject: '이메일 인증 입니다.',   // 제목
    html: '<p>이메일 인증 번호 : '+randomNumber+'</p>'  // 내용
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    }
    else {
      console.log('Email sent: ' + info.response);
    }

    res.json('1');
  });  


  }else{
    console.log('이미 가입된 이메일입니다.')
    res.json('2');
  }
 
 

      
})


router.post('/:chek/:email',async function(req,res){

  res.json(randomNumber);

 });





module.exports = router;