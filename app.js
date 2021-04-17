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


mongoose.connect("mongodb+srv://user1:1234@cluster0.9hxjc.mongodb.net/data?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true,useFindAndModify: false  });


//Model
 var crodata = require('./model/cro');
 var placedata = require('./model/place');
 var user = require('./model/user');


// app
var app = express();
// body-parser가 express 에 있어서 express로 해도 됨. 그래도 bady=parser가 필요할 때가 있음.
// app.use(bodyParser.json()); == app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false})); == app.use(express.urlencoded( { extended : false }));




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
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(session({ secret: '비밀코드', resave: true, saveUninitialized: false })); // 세션 활성화
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


app.listen(3000,function(){
    console.log('hello world');
});