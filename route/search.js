var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var crodata = require('../model/cro');
var data = require('../model/array');
const {spawn} = require('child_process');
const {PythonShell} = require("python-shell");
var async = require('async');

var date = new Date();

var year = date.getFullYear();
var month = date.getMonth();
var day = date.getDate();

if (month < 10) {
     month = "0" + month; 
    } 
if (day < 10) {
     day = "0" + day; 
    }

let Fulldate = year + '-' + month + '-' + day;



function FindCrawler(crawler) {
 
   return crodata.find({ $and: [ {tags:{$regex:crawler}},{$or : [{content:{$regex:'사람'}} , {content:{$regex:'행사'}},{content:{$regex:'날씨'}}]}]},{_id:0,content:1,date:1,tags:1},{sort:{data:-1}}).exec();
}

function CountCrawler(crawler){
     //오늘 날짜와 같은 것들을 찾아서 개수로 치기..
    return crodata.countDocuments({date:Fulldate}).exec();
}







router.get('/',function(req,res) {

    let isOwner = false;   // 크롤링 데이터가 없을경우
    var number=req.query.test;

   
    
    
    var ser1 = req.query.title;
    let ser = ser1.replace(/ /gi, "");
    
    
    var remove = require('../DbRemove');

      res.render('infolist',{rr:number});




  

})

router.get('/:title',function(req,res){
    let title = req.query.title;
    let ser = title.replace(/ /gi, "");
    console.log(ser);


   const python = spawn('python', ['crawler.py',ser]);
   
   python.on('exit',async function(code){

    console.log('완료');

    //db중복 제거
     var remove =  require('../DbRemove'); 



        // 크롤링 출력 부분이랑 count부분을 묶어서 한번에 res를 보내야함. 그렇기 위해선 함수로 DB를 사용하자.
        
      var li = await FindCrawler(ser); 
      var ch = await CountCrawler(ser);
      let Congestion= 0;
      

    
      if(0<=ch<50){ // ch가 0~50 미만일 경우 쾌적
        Congestion=1
        li.push(Congestion);
        console.log(li);
        res.json(li);

        
      }else if(50<=ch<100){ //ch가 50이상100미만 보통
        Congestion=2
        li.push(Congestion);
        console.log(li);
        res.json(li);

      }else if(ch>100){ //ch가 100이상일 경우 혼잡
        Congestion=3
        li.push(Congestion);
        console.log(li);
        res.json(li);
      }
  
    

   })


}) 





module.exports = router;