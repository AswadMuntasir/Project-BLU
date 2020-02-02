var db = require('./db');

module.exports = {

	login: function(user, callback){
		var sql = "select * from user where email='"+user.email+"' and password='"+user.password+"'";
		db.getResult(sql, function(results){
			if(results.length > 0){
				if(results[0].type == "client"){
					callback(true, [results[0].id,"userProfile"],results[0].type);
				}
				else if (results[0].type == "hr") {
					callback(true, [results[0].id,"HR"]);
				}
				else if (results[0].type == "admin") {
					callback(true, [results[0].id,"admin"]);
				}
				else{
					callback(false);
				}
			}
			else{
				callback(false);
			}
		});
	},
	passRecover:function(user, callback){
		var sql = "update user set password='"+user.conPass+"' where email='"+user.email+"' and name='"+user.name+"'";
		db.execute(sql, function(status){
			callback(status)
		});
	}
}