var express  = require('express');
var router = express.Router();
var Post = require('../model/Post');
var util = require('../util');
const User = require('../model/user');
const jwt = require("jsonwebtoken");
let secretObj = require("../config/jwt");



/* 
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
            .json({ isAuth: false, error: "token에 해당하는 유저가 없습니다" }); 
        }
        if (user) {
              
         
          //return isAuth = true;
        }
      });
    });


  }else{
   //이쪽부분을 로그인 안할시 차단하면 될듯?

  }

 */



// Index
router.get('/', function(req, res){
  
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
            .json({ isAuth: false, error: "token에 해당하는 유저가 없습니다" }); 
        }
        if (user) {
              
          Post.find({})
            .sort('-createdAt')
            .exec(function(err, posts){
             if(err) return res.json(err);
             res.render('posts/index', {user:user.user_id,posts:posts});
            });
          //return isAuth = true;
        }
      });
    });


  }else{
    Post.find({})
            .sort('-createdAt')
            .exec(function(err, posts){
             if(err) return res.json(err);
             res.render('posts/index', {user:isOwner,posts:posts});
            });
  }
});

// New
router.get('/new', function(req, res){
  var isOwner =false;
  var post = req.flash('post')[0] || {};
  var errors = req.flash('errors')[0] || {};
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
            .json({ isAuth: false, error: "token에 해당하는 유저가 없습니다" }); 
        }
        if (user) {
          //return isAuth = true;
          res.render('posts/new', { post:post,user:user.user_id, errors:errors });
        }
      });
    });

   }else{
    //이쪽부분을 로그인 안할시 차단하면 될듯?
    res.redirect('/login');
    /* res.render('posts/new', { post:post,user:isOwner, errors:errors }); */
  }
  
});

// create
router.post('/', function(req, res){

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
            .json({ isAuth: false, error: "token에 해당하는 유저가 없습니다" }); 
        }
        if (user) {
          Post.create(req.body, function(err, post){
            if(err){
              req.flash('post', req.body);
              req.flash('errors', util.parseError(err));
              return res.redirect('/posts/new');
            }
            res.redirect('/posts');
          });
         
          //return isAuth = true;
        }
      });
    });


  }else{
   //이쪽부분을 로그인 안할시 차단하면 될듯?
   res.redirect('/login');
  }
  
});

// show
router.get('/:id', function(req, res){
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
            .json({ isAuth: false, error: "token에 해당하는 유저가 없습니다" }); 
        }
        if (user) {
          Post.findOne({_id:req.params.id}, function(err, post){
            if(err) return res.json(err);
            res.render('posts/show', {post:post,user:user.user_id});
          });
               
          //return isAuth = true;
        }
      });
    });


  }else{
   //이쪽부분을 로그인 안할시 차단하면 될듯?
   res.redirect('/login');
  }
});

// edit
router.get('/:id/edit', function(req, res){
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
            .json({ isAuth: false, error: "token에 해당하는 유저가 없습니다" }); 
        }
        if (user) {
          var users = user.user_id;
          var post = req.flash('post')[0];
          var errors = req.flash('errors')[0] || {};
          if(!post){
            Post.findOne({_id:req.params.id}, function(err, post){
                if(err) return res.json(err);
                res.render('posts/edit', { post:post,user:users, errors:errors });
              });
          }
          else {
            post._id = req.params.id;
            res.render('posts/edit', { post:post,user:users, errors:errors });
          }
         
          //return isAuth = true;
        }
      });
    });


  }else{
   //이쪽부분을 로그인 안할시 차단하면 될듯?
   res.redirect('/login');
  }
  
});

// update
router.put('/:id', function(req, res){
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
            .json({ isAuth: false, error: "token에 해당하는 유저가 없습니다" }); 
        }
        if (user) { 
          req.body.updatedAt = Date.now();
          Post.findOneAndUpdate({_id:req.params.id}, req.body, {runValidators:true}, function(err, post){
            if(err){
              req.flash('post', req.body);
              req.flash('errors', util.parseError(err));
              return res.redirect('/posts/'+req.params.id+'/edit');
            }
            res.redirect('/posts/'+req.params.id);
          });
          //return isAuth = true;
        }
      });
    });


  }else{
   //이쪽부분을 로그인 안할시 차단하면 될듯?
   res.redirect('/login');
  }
 
});

// destroy
router.delete('/:id', function(req, res){
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
            .json({ isAuth: false, error: "token에 해당하는 유저가 없습니다" }); 
        }
        if (user) {
          Post.deleteOne({_id:req.params.id}, function(err){
            if(err) return res.json(err);
            res.redirect('/posts');
          });
          //return isAuth = true;
        }
      });
    });


  }else{
   //이쪽부분을 로그인 안할시 차단하면 될듯?
   res.redirect('/login');
  }
 
});

module.exports = router;