var db = require('./db');

module.exports = {
	validate: function(user, callback){
		var sql = "select * from admin where name=? and password=?";
		db.getResult(sql, [user.username, user.password], function(results){			
			if(results.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getById: function(id, callback){
		var sql = "select * from hr where id=?";
		db.getResult(sql, [id], function(result){
			callback(result);
		});
	},
	getByName: function(user, callback){
		var sql = "select * from hr where username=?";
		db.getResult(sql, [user.username1], function(result){
			callback(result);
		});
	},
	getByName1: function(hotel, callback){
		var sql = "select * from hotel where name=?";
		db.getResult(sql, [hotel.name1], function(result){
			callback(result);
		});
	},
	getByName2: function(booking, callback){
		var sql = "select * from booking where hName=?";
		db.getResult(sql, [booking.name1], function(result){
			callback(result);
		});
	},
	
	getAll: function(callback){
		var sql = "select * from hr";
		db.getResult(sql, [], function(results){
			callback(results);
		});
	},
	getAllHotel: function(callback){
		var sql = "select * from hotels";
		db.getResult(sql, [], function(results){
			callback(results);
		});
	},
		getAllBooking: function(callback){
		var sql = "select * from booking";
		db.getResult(sql, [], function(results){
			callback(results);
		});
	},
	insert: function(user, callback){
		var sql = "insert into hr values (?,?,?,?,?,?,?,?,?,?)";
		db.execute(sql,['',user.username,user.email,user.contact,user.address,user.gender,user.date1,user.salary,user.cpass,"Active"], function(status){
			callback(status)
		});
	},
	update: function(user, callback){
		var sql = "update hr set username=?, email=?, contact=?, address=?, salary=?, password=? where id=?";
		db.execute(sql, [user.username, user.email, user.contact, user.address, user.salary, user.password, user.id], function(status){
			callback(status);
		});
	},
	update1: function(user, callback){
		var sql = "update hr set status='Inactive' where id=?";
		db.execute(sql, [user], function(status){
			callback(status);
		});
	},
	update2: function(user, callback){
		var sql = "update hr set status='Active' where id=?";
		db.execute(sql, [user], function(status){
			callback(status);
		});
	},
		
		
	del: function(id, callback){
		var sql = "delete from hr where id=?";
		db.execute(sql, [id], function(status){
			callback(status)
		});
	}
}