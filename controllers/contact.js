var express = require('express');
/*var user = require.main.require('./models/user-model');*/
var router = express.Router();

router.get('/', function(req, res){
	if(req.session.un != null){
		res.render('contact/contact', {login: [req.session.un,"userProfile"]});
	}else{
		res.render('contact/contact', {login: ["login","login"]});
	}
});

module.exports = router;