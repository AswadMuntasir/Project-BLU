var express = require('express');
var user	= require.main.require('./models/user-model');
var router = express.Router();


router.get('/', function(req, res){
	res.render('login/index');
});

router.post('/', function(req, res){
	
	var data = {
		username: req.body.username,
		password: req.body.password
	};

	user.validate(data, function(status){
		if(status){
			req.session.un = req.body.username;
			res.redirect('/home');
		}else{
			res.send('invalid username/password...');
		}
	});

});


module.exports = router;