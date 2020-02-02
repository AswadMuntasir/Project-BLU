var mysql = require('mysql');

var confiq = {
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'node1'
};

var getConnection = function(callback){

	var connection = mysql.createConnection(confiq);
	
	connection.connect(function(err) {
	  	if (err){
	  		console.log('Connection error...');
	  	}
	  	console.log('connected as id ' + connection.threadId);
	});

	callback(connection);
}

module.exports= {
	getResult: function(sql, params, callback){

		if(params != ""){
			getConnection(function(connection){
				connection.query(sql, params, function (error, results) {	
					if(error){
						callback([]);
					}else{
						callback(results);					
					}
				});
				connection.end(function(err) {
						console.log('connection ending....');
				});
			});
		}else{
			getConnection(function(connection){
				connection.query(sql, function (error, results) {	
					if(error){
						callback([]);
					}else{
						callback(results);					
					}
				});
				connection.end(function(err) {
						console.log('connection ending....');
				});
			});
		}
	},
	execute: function(sql, params, callback){

		if(params != ""){
			getConnection(function(connection){
				connection.query(sql, params, function (error, status) {
					if(status){
						callback(true);
					}else{
						callback(false);
					}
				});

				connection.end(function(err) {
					console.log('connection ending....');
				});
			});
		}else{
			getConnection(function(connection){
				connection.query(sql, function (error, status) {
					if(status){
						callback(true);
					}else{
						callback(false);
					}
				});

				connection.end(function(err) {
					console.log('connection ending....');
				});
			});
		}
	}
}




