# Authentication with Passport Module

## Module Passport

- **Passport** is authentication middleware for Node.js.
- Passport authenticates an user and can be associate to a **web session**.
    - An Express session, for an Express Node.js server.
- Installing the module:
    ```bash
    npm install passport
    ```

### Sessions with Cookies

- A **session** is established by setting an **HTTP cookie** in the browser.
- The browser then transmits the HTTP cookie to the server on every request. 
- [**Web cookies**](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) are small data used for web site server and client browser to maintain some state between transactions.
    - Server application can **set cookies** with web browsers.
    - Web browser sends these cookies back in response to each request.

![Cookie basic example.](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies/cookie-basic-example.png)

### Express Session

- The module `express-session` settings object for the session ID cookie. 
- Installation:
    ```bash
    npm install express-session
    ```
- Supporting sessions in the requests:
    ```javascript
    import session from 'express-session';

    const sessionHandler = session({
        secret: 'a-secret',
        resave: false,
        saveUninitialized: false,
    });

    const app = express();

    app.use(sessionHandler);
    ```
- Configuration notes:
    - `resave`: forces the session to be saved back to the session store, even if the session was never modified during the request.
    - `saveUninitialized`: forces a session that is "uninitialized" to be saved to the store.
    - Cookie properties, such as `secure` and `httpOnly`, can be configured here.

### Passport with Sessions

- `passport-session()` is  a middleware to add passport to the session and alter the request object related to the user.
- To maintain a login session, **passport** serializes and deserializes user information to and from the session.
- The information that is stored is determined by the application, which supplies a `serializeUser` and a `deserializeUser` function.
    ```javascript
    import passport from 'passport';
    import session from 'express-session';

    const sessionHandler = session({
        secret: 'a-secret',
        resave: false,
        saveUninitialized: false,
    });

    const app = express();

    app.use(sessionHandler);

    app.use(passport.session());

    passport.serializeUser(function (user, cb) {
        return cb(null, {
            id: user.id,
            username: user.username
        });
    });

    passport.deserializeUser(function (user, cb) {
        return cb(null, user);
    });
    ```

## Authentication: Login

- Passport middleware exposes a `login()` function on request object that can be used to establish a login session.
- Resource to the view for the login form:
    ```javascript
    app.get('/login', loginHome);

    function loginHome(req, res){
        // If user is already authenticated, go to home
        if (req.isAuthenticated())
            return res.redirect('/');        
        return res.render('form-login-view');
    }
    ```

- Resource to receive the data:
    ```javascript
    app.post('/login', loginAuth);

    function loginAuth(req, res, next){
        console.log("Session:", req.session);

        const username = req.body.username; 
        const password = req.body.password;

        const userIndex = USERS.findIndex(user => username === user.name);

        if (userIndex != -1 && isValidUser(USERS[userIndex], username, password)) {
            console.log('login:', username);
            return req.login(USERS[userIndex], loginAction);
        } 
        else {
            // TODO: implement a view error (or an error message in the login page)
            return res.status(401).send('Invalid user/password');
        }

        function isValidUser(user, username, password) {
            return user && user.name === username && user.password === password;
        }

        function loginAction(err) {
            if (err) return next(err);
            return res.redirect('/');
        }	
    }
    ```
- User information example:
    ```javascript
	{
		id: 1,
		token: 'b0506867-77c3-4142-9437-1f627deebd67',
		name: 'asilva',
		password: '1234'
	}
    ```
- Passport serialization: includes the `user` object to the session in `session.passport.user`.
    ```javascript
    passport.serializeUser((userInfo, done) => { 
        console.log("userInfo", userInfo);
        const user = {
            name: userInfo.name,
            token: userInfo.token
        }
        done(null, user); 
    });
    ```
- Passport de-serialization: includes the `user` object to the request object `req` (as example) in `req.user`  after login.
    ```javascript
    passport.deserializeUser((userInfo, done) => { 
        console.log("userInfo (D)", userInfo);
        done(null, userInfo); 
    });
    ```

## Protected Resources

- Create an **authentication middleware**:
    ```javascript
    function authenticate(req, res, next){
        if (! req.isAuthenticated())
            res.redirect('/login');
        next();
    }
    ```
- Protected resource must to call the authentication middleware first.
    ```javascript
    app.get('/', authenticate, home);
    ```

## Logout

- Resource (to be associated to a button 'logout'):
    ```javascript
    app.post('/logout', logout);
    ```
- Function: redirect to home `'/'`.
    ```javascript
    function logout (req, res) {
        return req.logout(function (){
            return res.redirect('/');
        });
    }
    ```

## Sign Up: Create an User

- Resource to show the user sign up form:
    ```javascript
    app.get('/signup', signupHome);

    function signupHome(req, res){
        return res.render('signup-form-view');
    }
    ```
- Resource to create an user based on the form data (and, then, login):
    ```javascript
    app.post('/signup', signup);

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
    ```