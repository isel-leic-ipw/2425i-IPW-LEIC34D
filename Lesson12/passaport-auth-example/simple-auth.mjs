'use strict';

import express from 'express';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser'; // Only used to see the cookie value

const PORT = 8888;

passport.serializeUser((userInfo, done) => { 
	console.log("userInfo", userInfo);
	const user = {
		name: userInfo.name,
		token: userInfo.token
	}
	done(null, user); 
});
passport.deserializeUser((userInfo, done) => { 
	console.log("userInfo (D)", userInfo);
	done(null, userInfo); 
});

const sessionHandler = session({
	secret: 'isel-ipw',
	resave: false,
	saveUninitialized: false,
});

const app = express();

app.use(express.urlencoded({extended:false})); // Read body into req.body
app.use(sessionHandler);        // Support sessions in req.session
app.use(passport.session());    // Support login sessions in passport
//app.use(passport.authenticate('session')); // the same
app.use(cookieParser()); 		// Only used to see the cookie value

// Users example in memory:
const USERS = [
	{
		id: 1,
		token: 'b0506867-77c3-4142-9437-1f627deebd67',
		name: 'asilva',
		password: '1234'
	},
	{
		id: 2,
		token: 'f1d1cdbc-97f0-41c4-b206-051250684b19',
		name: 'isel',
		password: 'ipw'
	},
];

let currentId = USERS.length + 1;

function nextId(){
	return(currentId++);
}

// Resource protected by authentication
app.get('/', authenticate, home);

app.get('/login', loginHome);
app.post('/login', loginAuth);

app.post('/logout', logout);

app.get('/signup', signupHome);
app.post('/signup', signup);

// App listening...
app.listen(PORT, () =>
	console.log(`Example app listening on http://localhost:${PORT}!`),
);


// FUNCTIONS:

function authenticate(req, res, next){
	if (! req.isAuthenticated())
		return res.redirect('/login');
	next();
}

function home(req, res){
	console.log("Session:", req.session);
	console.log("req.cookies:", req.cookies);
	console.log("req.user:", req.user);

	return res.send(LoggedInHome(req));
}

function loginHome(req, res){
	console.log("Session in login home:", req.session);
	console.log("Cookies in login home:", req.cookies);

	// If user is already authenticated, go to home
	if (req.isAuthenticated())
		return res.redirect('/');
	 
	return res.send(NoLoginHome);
}

function signupHome(req, res){
	console.log("Session in signup home:", req.session);
	console.log("Cookies in signup home:", req.cookies);

	return res.send(SignupHome);
}

function loginAuth(req, res, next){
	console.log("Session before login:", req.session);
	console.log("Req.user before login:", req.user);

	const username = req.body.username; 
	const password = req.body.password;

	const userIndex = USERS.findIndex(user => username === user.name);

	if (userIndex != -1 && isValidUser(USERS[userIndex], username, password)) {
		console.log('login:', username);
		return req.login(USERS[userIndex], loginAction);
	} 
	else {
		// TODO: implement a view error (or an error message in the login page)
		return res.status(401).send('<p>Invalid user/password</p> <br> <a href="/"> Go back </a>');
	}

	function isValidUser(user, username, password) {
		return user && user.name === username && user.password === password;
	}

	function loginAction(err) {
		if (err) return next(err);
	
		console.log('>> login ok for', req.user.name);
		return res.redirect('/');
	}	
}

function logout (req, res) {
	return req.logout(function (){
		return res.redirect('/');
	});
}

function signup(req, res, next) {

	const username = req.body.username;
	const password = req.body.password;
	if (USERS.find(user => user.name === username)){
		// TODO: implement a view error (or an error message in the login page) 
		res.status(400);
		return res.send(username + ' already exists!');
	}
	const user = {
		id: nextId(),
		name: username,
		// TODO: create a token for the services
		password: password
	}
	USERS.push(user);

	// Login with the new user:
	return req.login(USERS[USERS.length-1], loginAction);

	function loginAction(err) {
		if (err) return next(err);
	
		console.log('>> login ok for', req.user.name);
		return res.redirect('/');
	}
}

// TODO: implement a view
const NoLoginHome = `
	<html>
		<head>
			<meta charset='utf-8'>
			<title>Passport Demo</title>
		</head>
		<body>
			<header>
				<h2>Passport Demo</h2>
			<header>
			<hr>
			<session>
				<form action="/login" method="POST">
					Username: <input type="text" name="username">
					Password: <input type="password" name="password">
					<input type="submit" value="Login">
				</form>
				<a href="/signup"> Sign up </a>
			</session>
			<hr>
			<footer>
				<p>Hello IPW@ISEL</p>
			</footer>
		</body>
	</html>
`;

const LoggedInHome = req => `
	<html>
		<head>
			<meta charset='utf-8'>
			<title>Passport Demo</title>
		</head>
		<body>
			<header>
				<h2>Passport Demo</h2>
			</header>
			<hr>
			<section>
				<form action="/logout" method="POST">
					User: <em>${req.user.name}</em>
					<input type="submit" value="Logout">
				</form>
			</session>
			<hr>
			</footer>
				<p>Hello ${req.user.name}</p>
			</footer>
		</body>
	</html>
`;

const SignupHome = `
	<html>
		<head>
			<meta charset='utf-8'>
			<title>Passport Demo</title>
		</head>
		<body>
			<header>
				<h2>Sign Up</h2>
			</header>
			<hr>
			<section>
			<form action="/signup" method="post">
				<section>
					<label for="username">Username</label>
					<input id="username" name="username" type="text" autocomplete="username" required>
				</section>
				<section>
					<label for="new-password">Password</label>
					<input id="new-password" name="password" type="password" autocomplete="new-password" required>
				</section>
				<button type="submit">Sign up</button>
			</form>
			</session>
			<hr>
			</footer>
				<p>Hello IPW@ISEL</p>
			</footer>
		</body>
	</html>
`;