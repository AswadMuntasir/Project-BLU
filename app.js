//DEC
var express 		= require('express');
var ejs 			= require('ejs');
var bodyParser 		= require('body-parser');
var expressSession 	= require('express-session');
var cookieParser 	= require('cookie-parser');
var login 			= require('./controllers/login');
var signup 			= require('./controllers/signup');
var logout 			= require('./controllers/logout');
var home 			= require('./controllers/home');
var about 			= require('./controllers/about');
var hotelresto 	    = require('./controllers/hotel-resto');
var contact 		= require('./controllers/contact');
var destination 	= require('./controllers/destination');
var blog 		    = require('./controllers/blog');
var blogSingle 		= require('./controllers/blog-single');
var userProfile		= require('./controllers/userProfile');
var hr				= require('./controllers/HR/home');
var admin			= require('./controllers/admin/home');
var app 			= express();


//CONFIG
app.set('view engine', 'ejs');


//MIDDLEWARE
app.use(bodyParser.urlencoded({'extended': false}));
app.use(expressSession({secret: 'my top secret password', saveUninitialized: true, resave: false}));
app.use(cookieParser());
app.use('/assets', express.static('assets'));
app.use('/login', login);
app.use('/signup', signup);
app.use('/logout', logout);
app.use('/home', home);
app.use('/about', about);
app.use('/hotel-resto', hotelresto);
app.use('/contact', contact);
app.use('/destination', destination);
app.use('/blog', blog);
app.use('/blog-single', blogSingle);
app.use('/userProfile', userProfile);
app.use('/admin', admin);
app.use('/HR', hr);



//ROUTING
app.get('/', function(req, res){
	res.send('Welcome to express web server...');
});


app.get('/setcookie', function(req, res){
	res.cookie('my_cookie', 'sdhdgshjdbahdbahjsdbshbd');
	res.send('done!');
});

app.get('/viewcookie', function(req, res){
	
	res.send(req.cookies['my_cookie']);
});


app.get('/rmcookie', function(req, res){
	res.clearCookie('my_cookie');
	res.send('removed!');
});





//SERVER STARTUP
app.listen(3000, function(){
	console.log('Server started at 3000....');
})


