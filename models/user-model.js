var db = require('./db');

module.exports = {

	
	getById: function(id, callback){
		var sql = "select * from user where id="+id;
		db.getResult(sql, function(result){
			callback(result);
		});
	},
	getHotelById: function(id, callback){
		var sql = "select * from hotels where id="+id;
		db.getResult(sql, function(result){
			callback(result);
		});
	},
	getBookingById: function(id, callback){
		var sql = "select * from booking where userID="+id;
		db.getResult(sql, function(result){
			callback(result);
		});
	},
	getAll: function(callback){

		var sql = "select * from user";
		db.getResult(sql, function(results){
			callback(results);
		});
	},
	getAllHotel: function(callback){

		var sql = "select * from hotels";
		db.getResult(sql, function(results){
			callback(results);
		});
	},
	register: function(user, callback){
		var sql = "insert into user values ('', '"+user.username+"', '"+user.address+"', '"+user.email+"','"+user.phone+"','"+user.password+"')";
		db.execute(sql, function(status){
			callback(status)
		});
	},
	booking: function(user, callback){
		var sql = "insert into booking values ('','"+user.userI+"','"+user.id+"','"+user.hName+"', '"+user.hAddress+"','"+user.roomType+"', '"+user.checkin+"','"+user.checkout+"','"+user.paid+"','"+user.due+"','"+user.status+"')";
		db.execute(sql, function(status){
			if(status==true){
				if(user.roomType=="suite"){
					var sql = "update hotels set suite = suite-1 where id="+user.id;
					db.execute(sql, function(status){
						callback(status)
					});
				}
				else if(user.roomType=="family"){
					var sql = "update hotels set family = family-1 where id="+user.id;
					db.execute(sql, function(status){
						callback(status)
					});
				}
				else if(user.roomType=="deluxe"){
					var sql = "update hotels set deluxe = deluxe-1 where id="+user.id;
					db.execute(sql, function(status){
						callback(status)
					});
				}
				else if(user.roomType=="superior"){
					var sql = "update hotels set superior = superior-1 where id="+user.id;
					db.execute(sql, function(status){
						callback(status)
					});
				}
				else if(user.roomType=="classic"){
					var sql = "update hotels set classic = classic-1 where id="+user.id;
					db.execute(sql, function(status){
						callback(status)
					});
				}
				else if(user.roomType=="luxury"){
					var sql = "update hotels set luxury = luxury-1 where id="+user.id;
					db.execute(sql, function(status){
						callback(status)
					});
				}
				else{
					callback(status)
				}
			}
			else{
				callback(status)
			}
		});
	},
	update: function(user, callback){
		var sql = "update user set name='"+user.name+"', address='"+user.address+"', email='"+user.email+"', phone='"+user.phone+"', password='"+user.password+"' where id="+user.id;
		db.execute(sql, function(status){
			callback(status)
		});
	},
	roomCheck: function(room, id, callback){
		var sql = "select suite from hotels where id="+id;
		db.getResult(sql, function(results){
			callback(results)
		});
	},
	delete: function(user, callback){
		var sql = "delete from user where id="+user.id;
		db.execute(sql, function(status){
			callback(status)
		});
	},
	bookingCancel: function(user, callback){
		var sql = "select * from booking where id="+user.id;
		db.getResult(sql, function(results){
			if(results.length > 0){
				var sql = "delete from booking where id="+user.id;
				db.execute(sql, function(status){
					if(status==true){
						if(results[0].roomType=="suite"){
							var sql = "update hotels set suite = suite+1 where id="+results[0].hotelid;
							db.execute(sql, function(status){
								callback(status)
							});
						}
						else if(results[0].roomType=="family"){
							var sql = "update hotels set family = family+1 where id="+results[0].hotelid;
							db.execute(sql, function(status){
								callback(status)
							});
						}
						else if(results[0].roomType=="deluxe"){
							var sql = "update hotels set deluxe = deluxe+1 where id="+results[0].hotelid;
							db.execute(sql, function(status){
								callback(status)
							});
						}
						else if(results[0].roomType=="superior"){
							var sql = "update hotels set superior = superior+1 where id="+results[0].hotelid;
							db.execute(sql, function(status){
								callback(status)
							});
						}
						else if(results[0].roomType=="classic"){
							var sql = "update hotels set classic = classic+1 where id="+results[0].hotelid;
							db.execute(sql, function(status){
								callback(status)
							});
						}
						else if(results[0].roomType=="luxury"){
							var sql = "update hotels set luxury = luxury+1 where id="+results[0].hotelid;
							db.execute(sql, function(status){
								callback(status)
							});
						}
						else{
							callback(status)
						}
					}
					else
						callback(status)
				});
			}
			else{
				callback(status)
			}
		});
	}
}