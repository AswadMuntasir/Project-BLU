var express = require('express');
var check = require.main.require('./models/login-model');
var router = express.Router();


router.get('/', function(req, res){
	if(req.session.un != null){
		req.session.un = null;
		req.session.UID = null;
	}
	res.render('login/index');
});

router.post('/', function(req, res){

	var data ={
		email: req.body.email,
		password: req.body.password
	}
	
	check.login(data, function(status, id){

		/*if(status=="admin"){
			req.session.un = req.body.username;
			res.redirect('/home');}else*/
			if (status==true) {
				req.session.un = req.body.email;
				req.session.UID = id[0];
				req.session.prf = id[1];
				req.session.typeID = id[2];
				res.render('home/index', {login: [req.session.un,id[1]]});
			}
			else{
				res.send('invalid username/password...');
			}
		});
});

router.get('/forget', function(req, res){
	res.render('login/forget');
});

router.post('/forget', function(req, res){
	if(req.body.name=="" || req.body.email=="" || req.body.pass=="" || req.body.conPass=="" ){
		res.send("Fillup all the information");
	}
	else if (req.body.pass != req.body.conPass) {
		res.send("Password Confirmation unsuccessful | Two Password Did Not matched");
	}

	else{

		var data ={
			name: req.body.name,
			email: req.body.email,
			conPass: req.body.conPass
		}
		check.passRecover(data, function(status){

		/*if(status=="admin"){
			req.session.un = req.body.username;
			res.redirect('/home');}else*/
			if (status==true) {
				res.redirect('/login');
			}
			else{
				res.send('Failed To Recover Password...Please Try again');
			}
		});
	}
	
});


module.exports = router;