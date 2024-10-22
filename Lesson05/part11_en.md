# Express Framework

- Express is a routing and middleware web framework that has minimal functionality.
- https://expressjs.com/
- Express is a Node module that needs installation using NPM:
    ```bash
    npm install express
    ```
- Base: HTTP module for NodeJS.
    - https://nodejs.org/api/http.html

## Creating an Express Application

- The `express()` function creates an Express application.
- This is a top-level function exported by the express module.

    ```javascript
    import express from 'express';

    const app = express();
    ```
- Application doc: https://expressjs.com/en/5x/api.html#app

### Routing

- Routing refers to determining how an application responds to a client request to a particular **endpoint**.
- An endpoint is a URI and a specific HTTP request method (*e.g.*, GET, POST, ...).
- Structure:
    ```
    app.METHOD(PATH, HANDLER)
    ```
    - Where:
        - `app` is an instance of express.
        - `METHOD` is an HTTP request method, in lowercase.
        - `PATH` is a path on the server.
        - `HANDLER` is the function executed when the route is matched.

### Some General Methods

- `app.listen([port[, host[, backlog]]][, callback])`
    - Binds and listens for connections on the specified host and port. 
    - This method is identical to Node’s `http.Server.listen()`.
    - If port is omitted or is 0, the operating system will assign an arbitrary unused port, which is useful for cases like automated tasks (tests, etc.).
    - Example:
        ```javascript
        import express from express;
        const app = express();
        app.listen(3000, () => {
            console.log("Server app is listening on port 3000.");
        });
        ```

- `app.all(path, callback [, callback ...])`
    - This method makes the endpoint matches all HTTP methods.
    ```javascript
        app.all('/test', (req, res) => {
            console.log('Any request method pass here ...');
            // continue...
        });
        ```
- A complete list of application methods, including HTTP methods:
    - https://expressjs.com/en/5x/api.html#app

### Some HTTP Methods

- All HTTP methods receives a `path` and `callback` as argument.
    - `path` is the URI path.
    - `callback` is a function that receives a `Request` and `Response` objects as argument.
- `app.get(path, callback [, callback ...])`
    - Routes HTTP GET requests to the specified path with the specified callback functions.
        ```javascript
        app.get('/', (req, res) => {
            res.send('GET request to root path');
        });
        ```
- `app.post(path, callback [, callback ...])`
    - Routes HTTP POST requests to the specified path with the specified callback functions.
        ```javascript
        app.post('/', (req, res) => {
            res.send('POST request to root path');
        });
        ```
- `app.put(path, callback [, callback ...])`
    - Routes HTTP PUT requests to the specified path with the specified callback functions.
        ```javascript
        app.put('/', (req, res) => {
            res.send('PUT request to root path');
        });
        ```
- `app.delete(path, callback [, callback ...])`
    - Routes HTTP DELETE requests to the specified path with the specified callback functions.
        ```javascript
        app.delete('/', (req, res) => {
            res.send('DELETE request to root path');
        });
        ```

### HTTP Request

- The request object has properties for the request query string, parameters, body, HTTP headers, and so on.
- Example with `params` property:
    ```javascript
    app.get('/user/:id', (req, res) => {
        res.send(`user ${req.params.id}`);
    });
    ```
    - The string `'/user/:id'` denotes an endpoint URI with the parameter `id`.
- [Documentation here](https://expressjs.com/en/5x/api.html#req).

### HTTP Response

- `res.end([data] [, encoding])`
    - Ends the response process.
    - Use to quickly end the response without any data.
    - If you need to respond with data, instead use methods such as `res.send()`.
        ```javascript
        res.end();
        ```
- `res.status(code)`
    - Sets the HTTP status for the response.
        ```javascript
        res.status(403).end();
        res.status(400).send('Bad Request');
        res.status(404).sendFile('/absolute/path/to/404.png');
        ```
- `res.send([body])`
    - Sends the HTTP response.
    - The body parameter can be a Buffer object, a String, an object, Boolean, or an Array.
    - For example:
        ```javascript
        // With a new buffer filled with the letters 'abc':
        res.send(Buffer.from('abc')); 
        // With an Object:
        res.send({ propName: 'propValue' });
        // With an String:
        res.send('<p>some html</p>');
        // With an String with status code:
        res.status(404).send('Sorry, we cannot find that!');
        // With an Object with status code:
        res.status(500).send({ error: 'Something blew up!' });
        ```

- [Documentation here](https://expressjs.com/en/5x/api.html#res).

### Hello World Server Example

```javascript
import express from 'express';

const PORT = 8000;  // Port number for the tests
const app = express(); // Express function returns an app

// Single endpoint to URI "/"
app.get("/", sendHello);

// App listening...
app.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`),
);


// FUNCTIONS:

function sendHello(req, res){
    res.send("Hello World!");
}
```

### Testing

1. In Terminal, go to the directory of the application server.
    1. Init a project (this step creates the file `package.json`).
        ```bash
        npm init
        ```
    2. Install Express:
        ```bash
        npm install express
        ```
2. Run the server application (suppose the name `hello-world-express.mjs`):
    ```bash
    node hello-world-express.mjs
    ```
2. Use any user-agent client to make requests:
    - Go to the browser and access the URL: http://localhost:8000/
    - **Or** use the Rest Client in VScode or Postman to make the following request:
        ```http
        GET http://localhost:8000/ HTTP/1.1
        ```

### Nodemon

- Instead of using `node` to run the application, `nodemon` can be used to prevent restart the application in case of modifications in the code.
- Install it globally (-g):
    ```bash
    npm install -g nodemon
    ```
- Optionally, but recommended, edit the `package.json` file and add the following properties, "start" and "start-dev", to the "scripts" property:
    ```json
        "scripts": {
            "start": "node hello-world-express.mjs",
            "start-dev": "nodemon hello-world-express.mjs",
            "test": "echo \"Error: no test specified\" && exit 1"
        }
    ```
- This allows us to run the server application as follow:
    ```bash
    npm start
    ```
- Or in development mode, with nodemon:
    ```bash
    npm run start-dev
    ```

## Example Application: Tasks API

- An application for manage simple tasks.
    - Example of a task object with id:
        ```json
        {
            id: 4,
            title: "Study HTTP",
            description: "Read the documentation."
        }
        ```
### Basic functionalities (CRUD)
- **Create**: set a new task, generating an URI for it;
    - The URI contains the id task.
- **Read**: get a task by the URI and/or get a list of tasks;
- **Update**: modify a task by the URI;
- **Delete**: delete a task by the URI.

### HTTP Methods and CRUD
- Now, we will consider the following HTTP methods:
    - GET: requests a representation of the **specified resource**.
    - POST: submits an **entity** to the specified resource, often causing a change in state or side effects on the server.
    - PUT: replaces all current representations of the **target resource** with the request content.
    - DELETE: deletes the **specified resource**.
- Except for the POST method, they all require a resource to be identified.
    - The resource is identified by an **URI**.
    - So, we use POST to add a task instead of PUT.
        - PUT method is used to update a task.

### Defining CRUD Methods
- `getAllTasks`: obtains all tasks (id and tittle);
- `getTask`: obtains a task by id;
- `addTask`: create a new task (server gives an id);
- `updateTask`: update a task by id;
- `deleteTask`: delete a task by id.

### Defining HTTP Methods and URI

  CRUD Method   |  HTTP Method  |  URI path
----------------|---------------|--------------
`getAllTasks`   |   GET         |  `/tasks`
`getTask`       |   GET         |  `/tasks/:id`
`addTask`       |   POST        |  `/tasks`
`updateTask`    |   PUT         |  `/tasks/:id`
`deleteTask`    |   DELETE      |  `/tasks/:id`

- URI path:
    - The base URI path is defined as `/tasks`.
- URI segment with **route parameters**:
    - The identifier is specified by a route parameter.
    - The colon (`:`) indicates the parameter with name after it.
    - The route parameters are associate to the Request object property `params`.
    - Example:
        - Route path: `/users/:userId/books/:bookId`
        - Request URL: `http://localhost:3000/users/34/books/8989`
        - req.params: `{ "userId": "34", "bookId": "8989" }`

### Routing Methods

```javascript
// get task by id
app.get("/tasks/:id", getTask);

// list tasks
app.get("/tasks", getAllTasks);

// add task
app.post("/tasks", addTask);

// delete task by id
app.delete("/tasks/:id", deleteTask);

// update task by id
app.put("/tasks/:id", updateTask);
```

### Content Type

- For request (POST and PUT) and response, it is necessary specify the content type.
- There are several options:
    - See [HTTP Header Content-Type documentation.](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type)
- In the next examples, `Content-Type: application/json` will be used.
    - It is a JSON type.

### Implementing the Handler Methods

- The tasks will be stored in memory in this example.
    - The array `TASKS` was defined as a constant.
    - The number `currentId` (variable) was defined as the `TASKS.length`.

#### Get Task

- Method `find()` of an array returns the task with an id equal to `req.params.id`.
    ```javascript
    function getTask(req, res){
        let task = TASKS.find(task => task.id == req.params.id);
        if (task)
        res.send(task);
        else
        res.status(404).end();
    }
    ```

#### Get All Tasks

- Two ways.
- Setting Content-Type and converting the object to string:
    ```javascript
    function getAllTasks(req, res){
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify(TASKS));
    }
    ```
- Using json method (the same as above):
    ```javascript
    function getAllTasks(req, res){
        res.json(TASKS);
    }
    ```

#### Delete task

- Method `find()` of an array returns the task with an id equal to `req.params.id`.
    ```javascript
    function deleteTask(req, res){
        let task = TASKS.find(task => task.id == req.params.id);
        if (task){
            tasks.pop(task);
            res.json(task).end();
        }
        else{
            res.status(404).end();
        }
    }
    ```

#### Parsing HTTP Request

- Useful Express middleware functions:
    - `express.json()`
    - `express.urlencoded()`
- In the case of a request, a **middleware function** is a function that have access to the request object (req).
- Method `use()` of an application indicates the use of the middleware function.
- `express.json()`
    - Parser and convert the request body to JSON.
    - Corresponds to the `Content-Type: application/json`.
    - Usage:
        ```javascript
        app.use(Express.json());
        ```
- `express.urlencoded()`
    - Parser the body as an URL-encoded form.
    - Corresponds to the `Content-Type: application/x-www-form-urlencoded`.
    - Usage:
        ```javascript
        app.use(Express.urlencoded());
        ```

#### Add Task

- Require the middleware function `express.json()` to parser the request body.
    - Define `app.use(express.json())` before.
    ```javascript
    function addTask(req, res){
        // Build the task:
        let task = {
            id: currentId,
            title: req.body.title,
            description: req.body.description
        }
        // Add the task:
        TASKS.push(task);
        currentId++;
        res.send(`Task id ${task.id} was added!`);
        res.status(201).end();
    }
    ```

#### Update Task

- Require the middleware function `express.json()` to parser the request body.
    - Define `app.use(express.json())` before.
    ```javascript
    function updateTask(req, res){
        // Find the task index.
        let taskIndex = TASKS.findIndex(task => task.id == req.params.id);
        if (taskIndex != -1){
            // Update the task
            TASKS[taskIndex].title = req.body.title;
            TASKS[taskIndex].description = req.body.description;
            res.json(TASKS[taskIndex]).end();
        }
        else{
            res.status(404).end();
        }
    }
    ```

#### Complete code

- Available at: [example-task-express-v0/](example-task-express-v0/).
- First version (this):
    - Task data are in **memory**.
- Next versions (in next classes):
    - Task data are persistent, in a database (*e.g.*, Elastic Search).

## Exercises

1. Implement a server books API with Express module.
    - A book should have a name, the number of pages, and the authors' names.
    - Book data must be in memory.
 
