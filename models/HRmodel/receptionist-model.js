var db = require('./db');

module.exports = {

	/*validate: function(user, callback){
		var sql = "select * from user where username=? and password=?";
		db.getResult(sql, [user.username, user.password], function(results){			
			if(results.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},*/

	getById: function(id, callback){
		var sql = "select * from receptionist where id=?";
		db.getResult(sql, [id], function(result){
			callback(result);
		});
	},

	getbyname: function(name, callback){
		var sql = "select * from receptionist where name=?";
		db.getResult(sql, name.name, function(result){
			callback(result);
		});
	},

	getAll: function(callback){
		var sql = "select * from receptionist";
		db.getResult(sql, [], function(results){
			callback(results);
		});
	},

	insert: function(user, callback){
		var sql = "insert into receptionist values (?,?,?,?,?,?,?,?,?,?,?)";
		db.execute(sql,['',user.username, user.email,user.password,user.dob,user.gender,user.salary,user.phone,user.address,user.hotel,'active'], function(status){
			callback(status)
		});
	},

	update: function(user, callback){
		var sql = "update receptionist set name=?,email=?,password=?,dob=?,gender=?,salary=?,phone=?,address=?,hotelname=? where id=?";
		db.execute(sql, [user.name,user.email, user.password,user.dob,user.gender,user.salary,user.phone,user.address,user.hotelname,user.id], function(status){
			callback(status);
		});
	},
	updatestatus: function(id, callback){
		var sql = "update receptionist set status='inactive' where id=?";
		db.execute(sql ,[id] , function(status){
			callback(status);
		});
	},
	updatestatus2: function(id, callback){
		var sql = "update receptionist set status='active' where id=?";
		db.execute(sql ,[id] , function(status){
			callback(status);
		});
	},

	delete: function(id, callback){
		var sql = "delete from receptionist where id=?";
		db.execute(sql, [id], function(status){
			callback(status)
		});
	}

}