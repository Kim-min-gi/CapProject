var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../model/user');
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
let secretObj = require("../config/jwt");


router.get("/", (req, res) => {
    // 쿠키를 지웁니다.
  
    res
    .clearCookie('token')
    .redirect('/');
    
  });



  module.exports = router;