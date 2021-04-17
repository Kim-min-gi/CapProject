var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var crodata = require('../model/cro');
var data = require('../model/array');
const {spawn} = require('child_process');
const {PythonShell} = require("python-shell");
var async = require('async');





router.get('/',function(req,res) {

    let isOwner = false;   // 크롤링 데이터가 없을경우
    var number=req.query.test;

    var date1 = new Date();
    var date2 = date1.getFullYear()+'-'+date1.getMonth()+'-'+date1.getDay();

    
    var ser1 = req.query.title;
    let ser = ser1.replace(/ /gi, "");
    
    
    var remove = require('../DbRemove');

      res.render('infolist',{rr:number});
    //크롤링 부분 추가하기
   /*  async.waterfall([

        function(cb){
        const python = spawn('python', ['crawlerlogin_01.py',ser]);      
        cb(null);
        },
     
        function(cb){
              //2분 딜레이
              var remove = require('../DbRemove');
              var save = require('../DbSave');
                    cb(null);

                 },
        function(cb){
            
            crodata.find({ tags:{$regex:ser}} , function(err, result) {
                if(err) { console.log(err)}
                
                res.render('infolist',{rr:number,cro:result});  
            })  

        cb(null);
        
            } 
    ],function(err){
        if(err){
            console.log('Error 발생');
        }else{
            console.log('완료');
        } 
    }); */
     


})

router.get('/:title',function(req,res){
    let title = req.query.title;
    let ser = title.replace(/ /gi, "");
    console.log(title);

    //크롤링 넣기

    /// return 구조로 쭉쭉 내려가는거 찾아보기?
   // const python = spawn('python', ['crawlerlogin_01.py',title]);
    //위쪽에서 db가 저장이 될걸로 예상
   // var remove = require('../DbRemove');

   

   //db에 저장되어 있는 정보 출력  //tags = ser && content = '사람' or '행사' or '축제' data를 오름차순? 아니면 내림차순 해서 확인하기
     crodata.find({tags:{$regex:ser}}, {'_id':0,'content':1,'data':1,'tags':1} , function(err, result) { // 1. 오늘날짜와 비교 후 출력 2. 3개만 출력하기? 3. 특정 명령어 넣어서 출력하기(사람, 축제 등등?) 4. 날짜순으로 오름차순으로 출력하기
        if(err) { console.log(err)}
        if(!result){
            res.json('해당하는 데이터가 없습니다.');
        }else{
            
            
            res.json(result);             ///     res.json(JSON.stringify(result)); 로 작성하니 한글자씩 배열로 들어가버림; data[5]를 출력하면 n이 나와버림
        }
         
    }) 
})





module.exports = router;