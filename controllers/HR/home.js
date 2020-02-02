var express = require('express');
var receptionist = require.main.require('./models/HRmodel/receptionist-model');
var hotel = require.main.require('./models/HRmodel/hotel-model');
var message = require.main.require('./models/HRmodel/message-model');


var router = express.Router();


router.get('*', function(req, res, next){
	if(req.session.un != null){
		next();
	}else{
		res.redirect('/login');
	}
});

router.get('/', function(req, res){
	res.render('HRhome/index');
});

router.post('/', function(req, res){//sms part
	var data = {
		sms			: req.body.sms,
		reciever	: req.body.reciever
	};
	console.log(data.reciever);
	message.insert(data, function(status){
		if(status){
			res.render('HRhome/index');
		}
		else{
			res.send('invalid  sms...');
		}
	});
});


router.get('/add_receptionist', function(req, res){ //hotel add
	var error={
			passworderror :""
		};
	hotel.getAll(function(results){
		res.render('HRhome/addreceptionist', {List: results,error});
	});
});
router.post('/add_receptionist', function(req, res){
	
	var data = {
		username	: req.body.name,
		email		: req.body.email,
		password	: req.body.password,
		cpass		: req.body.cpass,
		dob			: req.body.dob,
		gender		: req.body.gender,
		salary		: req.body.salary,
		phone		: req.body.phone,
		address		: req.body.address,
		hotel		: req.body.hotel,
	}
	if(data.password.length >=8)
	{
		if(data.password==data.cpass)
		{
		receptionist.insert(data, function(status){
			if(status){
				res.redirect('/HRhome');
			}else{
				res.send('invalid  data...');
			}
		});
		}
		else
		{
			var error={
			passworderror :"Password Can't match."
			};
			hotel.getAll(function(results){
			res.render('HRhome/addreceptionist', {List: results,error});
			});	
		}
	}
	else
	{
		var error={
			passworderror :"Password must be at least 8 characters long"
		};
		hotel.getAll(function(results){
		res.render('HRhome/addreceptionist', {List: results,error});
		});	
	}
	

});
router.get('/view_receptionist', function(req, res){//view all receptionist
	receptionist.getAll(function(results){
		res.render('HRhome/viewreceptionist', {List: results});
	});
});

router.post('/view_receptionist', function(req, res){//view by name receptionist
	var data = {
		name	: req.body.name
	};
	receptionist.getbyname(data,function(results){
		res.render('HRhome/viewreceptionist', {List: results});
	});
});

router.get('/editreceptionist/:id', function(req, res){ //update receptionist
	receptionist.getById(req.params.id, function(result){
		hotel.getAll(function(results){
		res.render('HRhome/editreceptionist', {receptionist: result[0],List: results});
	});
		
	});
});
router.post('/editreceptionist/:id', function(req, res){
	var data = {
		id 			: req.params.id,
		name		: req.body.name,
		email		: req.body.email,
		password	: req.body.password,
		dob			: req.body.dob,
		gender		: req.body.gender,
		salary		: req.body.salary,
		phone		: req.body.phone,
		address		: req.body.address,
		hotelname	: req.body.hotelname
	}
	receptionist.update(data, function(status){
		if(status){
			res.redirect('/HRhome/view_receptionist');
		}else{
			res.redirect('/HRhome/editreceptionist/'+req.params.id);
		}
	});

});

router.get('/deletereceptionist/:id', function(req, res){// delete receptionist
	receptionist.delete(req.params.id, function(status){
		if(status)
		{
			receptionist.getAll(function(results){
			res.render('HRhome/viewreceptionist', {List: results});
			});
		}
		else
		{
			res.redirect('/HRhome/viewreceptionist',{List: results});
		}
	});
});



//add hotel

router.get('/add_hotel', function(req, res){
	res.render('HRhome/addhotel');
});
router.post('/add_hotel', function(req, res){
	
	var data = {
		hotelName		: req.body.hotelName,
		hotelAddress	: req.body.hotelAddress,
		suite			: req.body.suite,
		family			: req.body.family,
		deluxe			: req.body.deluxe,
		classic			: req.body.classic,
		superior		: req.body.superior,
		luxury			: req.body.luxury,
		status			: "active"
	};
	hotel.insert(data, function(status){
		if(status==true){
			res.redirect('/HR');
		}else{
			res.send('invalid data...'+status);
		}
	});

});
router.get('/view_hotel', function(req, res){//view all receptionist
	hotel.getAll(function(results){
		res.render('HRhome/viewhotel', {List: results});
	});
});

//sms
router.get('/view_sms', function(req, res){//view all sms
	message.getAll(function(results){
		res.render('HRhome/viewsms', {List: results});
	});
});

//status
router.get('/active/:id', function(req, res){
	receptionist.updatestatus(req.params.id,function(status){

		receptionist.getAll(function(results){
		res.render('HRhome/viewreceptionist', {List: results});
		});
		
	});
});
router.get('/inactive/:id', function(req, res){
	receptionist.updatestatus2(req.params.id,function(status){

		receptionist.getAll(function(results){
		res.render('HRhome/viewreceptionist', {List: results});
		});
		
	});
});
//hotel status
router.get('/hotel/active/:id', function(req, res){
	hotel.updatestatus(req.params.id,function(status){

		hotel.getAll(function(results){
		res.render('HRhome/viewhotel', {List: results});
		});
		
	});
});
router.get('/hotel/inactive/:id', function(req, res){
	hotel.updatestatus2(req.params.id,function(status){

		hotel.getAll(function(results){
		res.render('HRhome/viewhotel', {List: results});
		});
		
	});
});
module.exports = router;