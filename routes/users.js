var express = require('express');
var router = express.Router();
var chatModel=require('../models/loginModel.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
   res.render('login', { title: 'login page' });
});

router.get('/login', function(req, res, next) {
   res.render('login', { title: 'login page' });
});

router.get('/register', function(req, res, next) {
   res.render('register', { title: 'registration page' });
});


router.post('/register', function(req, res, next) {
  var uname=req.body.username;
  var mail=req.body.email;
  var phone=req.body.phone;
  var pwd=req.body.password;

  //document
  var user=new chatModel({name: uname,email: mail,phone: phone,password: pwd});


  //saving document
  user.save(function(err,user){
    if(err) return console.error(err);
    else console.log('saved');
  });

  res.redirect('login');

});

router.post('/login', function(req, res, next) {
   var uname=req.body.username;
   var pwd=req.body.password;
   chatModel.findOne({'name':uname,'password':pwd},function(err,user){
     if(err||user==null)
      res.redirect('login');
    else {
      res.redirect('/chat/user?name='+uname);
    }
  });

});
module.exports=router;
