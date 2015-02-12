var express = require('express');
var fs = require('fs');
var router = express.Router();
var passport = require('passport');
router.use(express.static(__dirname + '/public'));
module.exports = router;
router.use(passport.initialize());
router.use(passport.session());


//===============ROUTES=================
//displays our homepage
router.get('/login', function(req, res){
  res.redirect('/auth/google');
});

//displays our signup page
router.get('/signin', function(req, res){
  res.render('signin');
});

router.get('/auth/google', passport.authenticate('google',{scope: 'https://www.googleapis.com/auth/plus.me https://www.google.com/m8/feeds https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile'}));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/signin' }),
  function(req, res, next) {
    // Successful authentication, redirect home.

	res.redirect('/index.html');

  });
  
   
  
router.get('/logout', function (req, res) {
        req.logOut();
        res.redirect('/');
    });
	
	

//sends the request through our local signup strategy, and if successful takes user to homepage, otherwise returns then to signin page
router.post('/local-reg', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/signin'
  })
);

//sends the request through our local login/signin strategy, and if successful takes user to homepage, otherwise returns then to signin page
router.post('/login', passport.authenticate('local-signin', { 
  successRedirect: '/',
  failureRedirect: '/signin'
  })
);

//logs user out of site, deleting them from the session, and returns to homepage
router.get('/logout', function(req, res){
  var name = req.user.username;
  console.log("LOGGIN OUT " + req.user.username)
  req.logout();
  res.redirect('/');
  req.session.notice = "You have successfully been logged out " + name + "!";
});
	