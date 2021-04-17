var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var crodata = require('../model/cro');
var data = require('../model/array');
const {spawn} = require('child_process');
const {PythonShell} = require("python-shell");
var async = require('async');



router.get('/',function (req,res,next) {

    var ser = req.query.keyword;
    console.log(ser)
    //array db컬렉션에 검색어 저장
    /* var name2 = new data({
        name:ser   //크롤링
    });
        name2.save(function (err,result) {
            if(err) return console.error(err);
            console.log(result);
            
        }); */

        
               // findOne을 find로 바꾼후 ejs 에서 cro[0].content 이런 형식으로 출력한다. 
           /*  crodata.find({tags:{$regex:ser}},function(err, result) {
                if(err) { console.log(err)}
                res.render('list.ejs',{ser:ser,cro:result});  
            })
              */
            res.render('list.ejs',{ser:ser});
  
    
});


/* router.get('/search',function(req,res) {
    var number=req.query.test;
    res.render('infolist',{rr:number});
}) */


module.exports = router;