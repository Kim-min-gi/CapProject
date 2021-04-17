var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var crodata = require('../model/cro');
var data = require('../model/array');
const {spawn} = require('child_process');
const {PythonShell} = require("python-shell");
const session = require('express-session');



router.get('/',function(req,res) {
    
    
    res.render('status');


});


module.exports = router;