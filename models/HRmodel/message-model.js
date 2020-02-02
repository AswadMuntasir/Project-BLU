var db = require('./db');

module.exports = {
	getAll: function(callback){
		var sql = "select * from sms where sender='Admin' or sender='Receptionist'";
		db.getResult(sql, [], function(results){
			callback(results);
		});
	},
	
	insert: function(user, callback){
		var sql = "insert into sms values (?,?,?,?)";
		db.execute(sql,['','HR', user.sms,user.reciever], function(status){
			callback(status)
		});
	},
	
}