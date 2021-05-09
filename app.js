var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const createError = require('http-errors');
var morgan = require('morgan');
const session = require('express-session');
const {spawn} = require('child_process');
const cookieParser = require("cookie-parser");
var flash = require('connect-flash');
var methodOverride = require('method-override');
// var path = require('path');





//MongoDB
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});


mongoose.connect("mongodb://localhost:27017/data", { useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true,useFindAndModify: false  });


//Model
 var crodata = require('./model/cro');
 var placedata = require('./model/place');
 var user = require('./model/user');


// app
var app = express();





// Routers
var main = require('./route/index'); //메인
var list = require('./route/list');  //검색 목록
var search = require('./route/search'); //검색 상세 목록
var login = require('./route/login'); //로그인
var logout = require('./route/logout'); //로그아웃
var signup = require('./route/signup'); //회원가입
var complete = require('./route/complete'); //회원가입 완료
var status = require('./route/status'); //혼잡도 페이지
var posts = require('./route/posts');  //게시판 페이지

// var users = require('./route/user');




// view engine setup

app.use(methodOverride('_method'));
app.use(flash());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.set('views',__dirname+'/views');  // == app.set('views',path.join(__dirname, 'views'));
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);


//css, js, 이미지 파일 같은 정적 파일 폴더 지정합니다.
app.use(express.static(__dirname + '/public'));



app.use('/',main);
app.use('/list',list);
app.use('/search',search);
app.use('/login',login);
app.use('/signup',signup);
app.use('/complete',complete);
app.use('/status',status);
app.use('/posts',posts);
app.use('/logout',logout);
// app.use('/users',users);  



/* // catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
}); */
const PORT = process.env.PORT || 3000 

app.listen(PORT,function(){
    console.log('hello world');
});