var db = require('./db');

module.exports = {
	validate: function(user, callback){
		var sql = "select * from user where username=? and password=? and type=?";
		db.getResult(sql, [user.username, user.password, "hr"], function(results){			
			if(results.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getById: function(id, callback){
		var sql = "select * from user where id=?";
		db.getResult(sql, [id], function(result){
			callback(result);
		});
	},
	getAll: function(callback){
		var sql = "select * from user";
		db.getResult(sql, [], function(results){
			callback(results);
		});
	},
	insert: function(user, callback){
		var sql = "insert into user values (?,?,?)";
		db.execute(sql,['',user.username, user.password], function(status){
			callback(status)
		});
	},
	update: function(user, callback){
		var sql = "update user set username=?, password=? where id=?";
		db.execute(sql, [user.username, user.password, user.id], function(status){
			callback(status);
		});
	},
	delete: function(id, callback){
		var sql = "delete from user where id=?";
		db.execute(sql, [id], function(status){
			callback(status)
		});
	}
}