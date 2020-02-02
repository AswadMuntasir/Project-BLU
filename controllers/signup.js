var express = require('express');
var user = require.main.require('./models/user-model');
var router = express.Router();


router.get('/', function(req, res){
	res.render('signup/index');
});

router.post('/', function(req, res){
	if(req.body.username=="" || req.body.address=="" || req.body.email=="" || req.body.phone=="" || req.body.password==""){
		res.redirect('/signup');
	}
	else {
		var data = {
			username: req.body.first_name + req.body.last_name,
			address: req.body.address,
			email: req.body.email,
			phone: req.body.area_code + req.body.phone,
			password: req.body.password
		}
		user.register(data, function(status){
			if(status){
				res.redirect('/home');
			}else{
				res.redirect('/signup');
			}
		});
	}	
});

module.exports = router;