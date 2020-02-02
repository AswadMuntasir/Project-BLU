var express = require('express');
var hotel = require.main.require('./models/user-model');
var router = express.Router();

router.get('/', function(req, res){
	if(req.session.un != null && req.session.prf != null){
		hotel.getAllHotel(function(results){
			res.render('hotel-resto/hotel-resto', {login: [req.session.un,req.session.prf, results]});
		});
		
	}else{
		hotel.getAllHotel(function(results){
			res.render('hotel-resto/hotel-resto', {login: ["login","login", results]});
		});
	}
});
router.get('/hotel/:id', function(req, res){
	hotel.getAllHotel(function(results){
		hotel.getHotelById(req.params.id, function(results){
			res.render('hotels/index', {hotel: results});
		});
		/*res.render('hotels/index', {hotel: [req.params.id]});*/
	});
});

router.post('/hotel/:id', function(req, res){
	if(req.session.un != null ){
		if(req.session.typeID != "client"){
			res.send('Not allowed to book a room... | You need a client account to book a hotel room');
		}
		else if(req.body.checkin=="" || req.body.checkout==""){
			res.send('Mendatory Field Can\'t be empty...');
		}
		else{
			hotel.roomCheck(req.body.roomType, req.params.id, function(results){
				if(results[0][req.body.roomType] > 0 && results.length > 0){

					var data = {
						id: req.params.id,
						userI: req.session.UID,
						hName: req.body.hotelN,
						hAddress: req.body.hotelA,
						roomType: req.body.roomType,
						checkin: req.body.checkin,
						checkout: req.body.checkout,
						paid: 0,
						due: 0,
						status: "Booked"
					}

					hotel.booking(data, function(status){
						if(status==true)
						{
							hotel.getHotelById(req.params.id, function(results){
								res.render('hotels/index', {hotel: results});
								/*res.render('hotels/index', {hotel: [req.params.id]});*/
							});
						}
						else
						{
							hotel.getHotelById(req.params.id, function(results){
								res.render('hotels/index', {hotel: results});
							});
							/*res.render('hotels/index', {hotel: [req.params.id]});*/
						}
					});
				}
				else {
					res.send("No room available for your choosen type");
				}

			});
			
		}
		
	}else{
		hotel.getAllHotel(function(results){
			res.redirect('/login');
		});
	}
});

module.exports = router;