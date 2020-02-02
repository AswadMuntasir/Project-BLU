var express = require('express');
var user = require.main.require('./models/user-model');
var router = express.Router();


/*router.get('*', function(req, res, next){
	if(req.session.un != null){
		next();
	}else{
		res.redirect('/login');
	}
});*/

router.get('/', function(req, res){

	if(req.session.un != null && req.session.prf != null){
		res.render('home/index', {login: [req.session.un, req.session.prf]});
	}else{
		res.render('home/index', {login: ["login","login"]});
	}
});
router.get('/emp', function(req, res){
	res.render('home/emp');
});

router.get('/user_list', function(req, res){
	user.getAll(function(results){
		res.render('home/userList', {userList: results});
	});
});

router.get('/product_list', function(req, res){
	user.getAllProduct(function(results){
		res.render('home/productList', {productList: results});
	});
});
/*router.get('/product_list', function(req, res){
	user.getAll(function(results){
		res.render('home/userList', {userList: results});
	});
});*/

router.get('/create', function(req, res){
	user.getById(req.params.id, function(result){
		res.render('home/create', {user: result[0]});
	});
});

router.post('/create', function(req, res){
	if(req.body.username=="" || req.body.password==""){
		res.redirect('/home/create');
	}
	else {
		var data = {
			id: req.params.id,
			empName: req.body.empName,
			contact: req.body.contact,
			username: req.body.username,
			password: req.body.password
		}
		user.insert(data, function(status){
			if(status){
				res.redirect('/home/user_list');
			}else{
				res.redirect('/home/create');
			}
		});
	}	
});

router.get('/createProduct', function(req, res){
	res.render('home/createProduct');
});

router.post('/createProduct', function(req, res){
	if(req.body.productName=="" || req.body.quantity==""){
		res.redirect('/home/createProduct');
	}
	else {
		var data = {
			id: req.params.id,
			productName: req.body.productName,
			quantity: req.body.quantity
		}
		user.insertProduct(data, function(status){
			if(status){
				res.redirect('/home/product_list');
			}else{
				res.redirect('/home/createProduct');
			}
		});
	}	
});

router.get('/edit/:id', function(req, res){
	user.getById(req.params.id, function(result){
		res.render('home/edit', {user: result[0]});
	});
});

router.post('/edit/:id', function(req, res){

	if(req.body.empName=="" || req.body.contact=="" || req.body.username=="" || req.body.password==""){
		res.redirect('/home/create');
	}
	else{
		var data = {
			id: req.params.id,
			empName: req.body.empName,
			contact: req.body.contact,
			username: req.body.username,
			password: req.body.password
		}
		user.update(data, function(status){
			if(status){
				res.redirect('/home/user_list');
			}else{
				res.redirect('/home/edit/'+req.params.id);
			}
		});

	}
	
});

router.get('/editProduct/:id', function(req, res){
	user.getProductById(req.params.id, function(result){
		res.render('home/editProduct', {product: result[0]});
	});
});

router.post('/editProduct/:id', function(req, res){

	if(req.body.productName=="" || req.body.quantity==""){
		res.redirect('/home/createProduct');
	}
	else{
		var data = {
			id: req.params.id,
			productName: req.body.productName,
			quantity: req.body.quantity
		}
		user.updateProduct(data, function(status){
			if(status){
				res.redirect('/home/product_list');
			}else{
				res.redirect('/home/editProduct/'+req.params.id);
			}
		});

	}
	
});

router.get('/delete/:id', function(req, res){
	var data = {
		id: req.params.id
	}
	user.delete(data, function(status){
		if(status){
			res.redirect('/home/user_list');
			/*import alert from 'alert-node';
			alert('hey!', 'yad');*/
		}else{
			res.redirect('/home/user_list');
			//alert('hey!', 'yad');
		}
	});

});

router.get('/deleteProduct/:id', function(req, res){
	var data = {
		id: req.params.id
	}
	user.deleteProduct(data, function(status){
		if(status){
			res.redirect('/home/product_list');
			/*import alert from 'alert-node';
			alert('hey!', 'yad');*/
		}else{
			res.redirect('/home/product_list');
			//alert('hey!', 'yad');
		}
	});

});

router.get('/search', function(req, res){
	user.getById(req.params.id, function(result){
		res.render('home/search', {userList: result[0]});
	});
});

/*router.post('/edit/:id', function(req, res){

	if(req.body.username=="" || req.body.password==""){
		res.redirect('/home/create');
	}
	else{
		var data = {
			id: req.params.id,
			username: req.body.username,
			password: req.body.password
		}
		user.update(data, function(status){
			if(status){
				res.redirect('/home/user_list');
			}else{
				res.redirect('/home/edit/'+req.params.id);
			}
		});

	}
	
});*/

module.exports = router;