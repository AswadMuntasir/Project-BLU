var express = require('express');
var user = require.main.require('./models/admin/user-model');
var message = require.main.require('./models/admin/message-model');
var router = express.Router();



router.get('*', function(req, res, next){
	if(req.session.un != null){
		next();
	}else{
		res.redirect('/login');
	}
});

router.get('/', function(req, res){
	res.render('admin/index');
});
router.post('/', function(req, res){//sms part
	var data = {
		sms			: req.body.sms,
	};
	message.insert(data, function(status){
		if(status){
			res.render('admin/index');
		}
		else{
			res.send('invalid  sms...');
		}
	});
});
router.get('/new', function(req, res){
	var error={
			passworderror :""
		};
	res.render('admin/new', {error});
});


router.get('/user_List', function(req, res){
	user.getAll(function(results){
		res.render('admin/userList', {userList: results});
	});
});



router.get('/hotel', function(req, res){
	user.getAllHotel(function(results){
		res.render('admin/hotel', {hotel: results});
	});
});
router.post('/hotel', function(req, res){
	var data = {
		
		name1: req.body.name1
		
		
		
	}
		user.getByName1(data, function(results){
		res.render('admin/hotel', {hotel: results});
		
	});
	
});
router.get('/booking', function(req, res){
	user.getAllBooking(function(results){
		res.render('admin/booking', {booking: results});
	});
});
router.post('/booking', function(req, res){
	var data = {	
		name1: req.body.name1
	}
		user.getByName2(data, function(results){
		res.render('admin/booking', {booking: results});
		
	});
	
});



router.post('/new', function(req, res){
	var data = {
		
		username: req.body.username,
		email:  req.body.email,
		contact:  req.body.contact,
		address:  req.body.address,
		gender:  req.body.gender,
		date1:  req.body.date1,
		salary:  req.body.salary,
		
		password: req.body.password,
	    cpass		: req.body.cpass,
	}
	if(data.password.length >=8)
	{
		if(data.password==data.cpass)
		{
		user.insert(data, function(status){
			if(status){
					res.redirect('/admin');
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
			res.render('admin/new', {error});
		}
	}
	else
	{
		var error={
			passworderror :"Password must be at least 8 characters long"
		};
		res.render('admin/new', {error});
	}
});





router.get('/edit/:id', function(req, res){
	user.getById(req.params.id, function(result){
		res.render('admin/edit', {user: result[0]});
	});
});
router.get('/delete/:id', function(req, res){
	user.del(req.params.id, function(status){
		
		if(status)
		{    
	        user.getAll(function(results){
			res.render('admin/userList', {userList: results});
			});
		}
		else
		{
		res.redirect('admin/userList', {userList: results});
		}
	});
});

router.get('/Active/:id', function(req, res){
  
	user.update1(req.params.id, function(status){
		user.getAll(function(results){
		res.render('admin/userList', {userList: results});
	  });
	});
});
router.get('/Inactive/:id', function(req, res){
  
	user.update2(req.params.id, function(status){
		user.getAll(function(results){
		res.render('admin/userList', {userList: results});
	  });
	});
});

router.post('/edit/:id', function(req, res){
	var data = {
		id: req.params.id,
		username: req.body.username,
		email:  req.body.email,
		contact:  req.body.contact,
		address:  req.body.address,
		
		salary:  req.body.salary,
		password: req.body.password
	}
	user.update(data, function(status){
		if(status){
			res.redirect('/admin/user_List');
		}else{
			res.redirect('/admin/edit/'+req.params.id);
		}
	});

});

router.get('/view_sms', function(req, res){//view all sms
	message.getAll(function(results){
		res.render('admin/viewsms', {List: results});
	});
});


module.exports = router;