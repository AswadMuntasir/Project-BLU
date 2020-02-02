var express = require('express');
var user = require.main.require('./models/user-model');
var router = express.Router();

router.get('/', function(req, res){
	res.render('userProfile/index');
});

router.get('*', function(req, res, next){
	if(req.session.un != null){
		next();
	}else{
		res.redirect('/login');
	}
});

router.get('/user', function(req, res){
	user.getById(req.session.UID, function(results){
		if(results.length > 0)
			res.render('userProfile/user', {userProfile: results});
		else
			res.render('userProfile/user', {userProfile: ["hello"]});
	});
});
router.post('/user', function(req, res){
	if(req.body.name=="" || req.body.address=="" || req.body.email=="" || req.body.phone=="" || req.body.password==""){
		user.getById(req.session.UID, function(results){
			if(results.length > 0)
				res.render('userProfile/user', {userProfile: results});
			else
				res.render('userProfile/user', {userProfile: ["hello"]});
		});
	}
	else{
		var data = {
			id: req.session.UID,
			name: req.body.name,
			address: req.body.address,
			email: req.body.email,
			phone: req.body.phone,
			password: req.body.password
		}
		user.update(data, function(status){
			if(status){
				user.getById(req.session.UID, function(results){
					if(results.length > 0)
						res.render('userProfile/user', {userProfile: results});
					else
						res.render('userProfile/user', {userProfile: ["hello"]});
				});
			}else{
				res.render('userProfile/user', {userProfile: ["hello"]});
			}
		});

	}
});
router.get('/tables', function(req, res){
	user.getBookingById(req.session.UID, function(results){
		if(results.length > 0)
			res.render('userProfile/tables', {bookingDetails: results});
		else
			res.render('userProfile/tables', {bookingDetails: results});
	});
	//res.render('userProfile/tables');
});

router.get('/tables/:id', function(req, res){

	var data = {
			id: req.params.id
		}
	user.bookingCancel(data, function(status){
		if(status==true){
			user.getBookingById(req.session.UID, function(results){
				if(results.length > 0)
					res.render('userProfile/tables', {bookingDetails: results});
				else
					res.render('userProfile/tables', {bookingDetails: results});
			});
		}
		else{
			user.getBookingById(req.session.UID, function(results){
				if(results.length > 0)
					res.render('userProfile/user', {bookingDetails: results});
				else
					res.render('userProfile/user', {bookingDetails: results});
			});
		}
	});
	//res.render('userProfile/tables');
});

module.exports = router;