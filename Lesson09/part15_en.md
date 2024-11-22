# Express Middleware

## Middleware Definition

- A software layer between the application and the distributed system.

![image](https://ars.els-cdn.com/content/image/3-s2.0-B9780128007297000066-f06-37-9780128007297.jpg)

- In the figure, processes A and B represent two applications connected by network.
    - Both processes use a middleware to communicate each other over a distributed system.

## Express middleware Definition

- "Express is a routing and middleware web framework that has minimal functionality of its own:"
    - "An Express application is essentially a series of **middleware function** calls."
    - [Documentation.](https://expressjs.com/en/guide/using-middleware.html)

## Middleware Functions

- Middleware functions are functions with access to the:
    - **request** object (`req`), 
    - the **response** object (`res`), and 
    - the **next middleware function** in the application's request-response cycle, typically referred to as `next`.

- If a middleware function does not terminate the request-response cycle (*e.g.*, with `send` call), it must invoke `next()`.
    - To pass control to the next middleware function;
    -  otherwise, the request will remain unprocessed.

### Types of Middleware in Express

- Built-in middleware
- Third-party middleware
- Application-level middleware
- Error-handling middleware
- Router-level middleware

## Built-in Middleware

- From version 4.x onwards, Express no longer includes middleware by default, with functions now available as separate modules:
    - `express.static`: Serves static files.
    - `express.json`: Parses JSON payloads (available from Express 4.16.0).
    - `express.urlencoded`: Parses URL-encoded payloads (available from Express 4.16.0).

- Example (used in Tasks Web API):
    ```javascript
    import express from 'express';

    const app = express(); // Express function returns an app

    // Parser the body to JSON
    app.use(express.json());
    ```

## Third-Party Middleware

- You can use third-party middleware for additional functionality. 
- Install the required module and import it into your application.
- For a list of commonly used third-party middleware:
    - [Third-party middleware](https://expressjs.com/en/resources/middleware.html).
    - We will use the CORS middleware.

### CORS

- Cross-Origin Resource Sharing (CORS) is a mechanism based on HTTP headers that enables a server to specify which origins (including domain, scheme, or port) are allowed to access its resources.
    - [Documentation.](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
    - `Access-Control-Allow-Origin` is an example of header used by CORS.
- For security reasons, browsers restrict cross-origin HTTP requests initiated from scripts.
- Example of a cross-origin request:
    - The front-end JavaScript code served from https://domain-a.com uses fetch() to make a request for https://domain-b.com/data.json.
    ![](https://mdn.github.io/shared-assets/images/diagrams/http/cors/fetching-page-cors.svg)

- An real example with the Tasks Web API is available at: [cors-problem/index.html](cors-problem/index.html)

- To allow other application to fetch our Tasks Web API being, we can use the third-party middleware CORS.

#### Install CORS

- For a specific node.js project:
    ```bash
    npm install cors
    ```

#### Usage

- Simple usage: enable all CORS requests.

    ``` javascript
    import express from 'express';
    import cors from 'cors';
    const app = express();

    app.use(cors());
    // ...
    ```


## Application-Level Middleware

- You can connect application-level middleware to the app instance using:
    - `app.use()` or 
    - `app.METHOD()` (where `METHOD` is the lowercase HTTP method, such as GET, POST, PUT and DELETE).
- In Express, all application-level middleware is a **middleware function**.
- Middleware functions are executed **sequentially**.
    - Therefore, the **order** of middleware inclusion is important.

### `app.use()`
- General syntax:
    ```
    app.use([path,] callback [, callback...])
    ```
- Default path: `"/"`
- **Examples:**
    - Example with one callback:
        ```javascript
        import express from 'express';
        const app = express();

        app.use(printDateNow);

        function printDateNow(req, res, next) {
            console.log('Time:', Date.now());
            next();
        }
        ```

    - Example With URI Path:
        ```javascript
        app.use('/user/:id', printRequestType);

        function printRequestType(req, res, next) {
            console.log('Request Type:', req.method);
            next();
        }
        ```

    - Multiple Middleware Functions:
        ```javascript
        app.use('/user/:id', printUrlRequest, printRequestType);

        // Other way:
        //app.use('/user/:id', printUrlRequest);
        //app.use('/user/:id', printRequestType);

        function printUrlRequest(req, res, next) {
            console.log('Request URL:', req.originalUrl);
            next();
        }

        function printRequestType(req, res, next) {
            console.log('Request Type:', req.method);
            next();
        }
        ```

### `app.METHOD()`
- **General syntax**:
    ```
    app.METHOD(path, callback [, callback ...])
    ```
- [Path examples here.](https://expressjs.com/en/4x/api.html#path-examples)
- **Examples:**
    - With GET method:
        ```javascript
        app.get('/users/:id', echoId);

        function echoId(req, res){
            res.send(req.params.id); 
        }
        ```
    - With GET method and with multiple callbacks:
        ```javascript
        app.get('/users/:id', printId, echoId);

        // Other way:
        //app.get('/users/:id', printId);
        //app.get('/users/:id', echoId);

        function printId(req, res, next){
            console.log(req.params.id); 
            next();
        }

        function echoId(req, res){
            res.send(req.params.id); 
        }
        ```

## Error-Handling Middleware

- Error-handling middleware is defined with **four arguments**. 
    - First is the error.
- **You must specify all four**, even if not used, to differentiate it from standard middleware.

- **Example:**
    ```javascript
    app.use(errorHandler);

    // Must use the four parameters:
    function errorHandler (err, req, res, next) {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    }
    ```

### Error and Async Functions

- For errors returned from asynchronous functions invoked by route handlers and middleware, you must pass them to the `next()` function.
    - Express will catch and process them.
- For example, with this async function that returns a Promise:

    ```javascript
    import fs from 'node:fs/promises';

    function readFile (req, res, next) {
        const filePromise = fs.readFile('/file-does-not-exist');
        return filePromise.then(data => res.send(data))
            .catch(err => next(err));
    }
    ```
- The response is:
    ```http
    HTTP/1.1 500 Internal Server Error
    X-Powered-By: Express
    Content-Security-Policy: default-src 'none'
    X-Content-Type-Options: nosniff
    Content-Type: text/html; charset=utf-8
    Content-Length: 348
    Date: Tue, 12 Nov 2024 13:07:01 GMT
    Connection: close

    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="utf-8">
    <title>Error</title>
    </head>
    <body>
    <pre>Error: ENOENT: no such file or directory, open &#39;/file-does-not-exist&#39;<br> &nbsp; &nbsp;at async open (node:internal/fs/promises:639:25)<br> &nbsp; &nbsp;at async Object.readFile (node:internal/fs/promises:1242:14)</pre>
    </body>
    </html>
    ```

- This is an error 500 (internal error), with a message error in HTML.
- To change the status code and the message, an error-handling middleware can be used.
- An example of middleware function to handler this error:

    ```javascript
    function errorHandler(err, req, res, next){
        res.status(404);
        res.send(err);
    }
    ```
- The middleware must be used at the end to be the last execution of the Express request cycle:
    ```javascript
    import express from 'express';

    const PORT = 7200;
    const app = express();

    app.get('/', readFile);

    app.use(errorHandler);

    app.listen(PORT, () =>
        console.log(`Example app listening on port ${PORT}!`),
    );
    ```


