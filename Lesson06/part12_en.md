# Web API and OpenAPI

- A Web API (*Application Programming Interface*) is a programmatic interface to a system that is accessed via standard HTTP methods and headers.

- There are several API protocols and architectures, such as:
    - Remote Procedure Call (RPC) protocols such as XML-RPC;
    - Simplified Object Access Protocol (SOAP);
    - Representational State Transfer (REST) architecture.

### REST

- An architectural style for distributed *hypermedia* (or *hypertext*) systems.
    - https://ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm
- Six constraints:
    1. **Client-Server**: separation of concerns between client and server.
    2. **Stateless**: each request from client to server must contain all of the information necessary to understand the request.
    3. **Cache**: requires that a response should implicitly or explicitly label itself as cacheable or non-cacheable.
    4. **Uniform Interface**: consistent and uniform interface for interactions between clients and servers.
    5. **Layered System**: hierarchical layers where each component cannot see beyond the immediate layer they are interacting with.
    6. **Code-On-Demand** (optional): client functionality can be extended by downloading and executing code in the form of applets or scripts.  
- A Web API conforming to the REST architectural style is called a REST API (or RESTful API).
- **REST and HTTP are not the same!**
    - REST is an architectural style while HTTP is an communication protocol.
    - HTTP can be used (and currently, it is!) to implement a REST system.

## Example: The Tasks API

- Tasks API is a REST Web API.
    - We have developed a server that receives HTTP (interface) requests and operates on the tasks;
    - CRUD operations can be performed on the tasks.

- Now, let's implement modules and add new functionalities.
    1. Define the modules for the TASKs and organize them.
    2. Add a new functionality: each task will have now an associated user.
    3. Organize the user modules.

### Define Modules

- **Server**: contains the entry point to the server application.
    - Defines an Express application `app` and middleware functions.
    - Defines the **route endpoints**.
    - Starts the server with `app.listen()`.
    - Module: a server file (*e.g.*, `tasks-server.mjs`).
- **Web API interface**: implementation of the HTTP routes that make up the web application interface.
    - Contains the handler functions associated to each route endpoint.
    - Module: web API files (*e.g.*, `tasks-web-api.mjs`).
- **API services**: implementation of the logic of each of the application's functionalities.
    - Everything that is related to application data but does not involve HTTP messages.
    - Module: service API files (*e.g.*, `tasks-services.mjs`).
- **API data**: direct access to data.
    - Data in a database or, simply, in memory (as the first example).
    - Module: data files (`tasks-data-mem.mjs`).
    - We will see this later...

### Modules

- Server file: `tasks-server.mjs`
- Web API module file: `tasks-web-api.mjs`
- API services module file: `tasks-services.mjs`
- API tasks data in memory: `tasks-data-mem.mjs`
    - We will see this file later...
    - `tasks-services.mjs` and `tasks-data-mem.mjs` are together for now.
- Import dependencies:
    ```
    tasks-server.mjs → tasks-web-api.mjs → tasks-services.mjs → tasks-data-mem.mjs
    ```
- See example available at: [example-tasks/](example-tasks/)

### Add Users to the Tasks API

- Consider that each task has an owner user associated.
- Example:
    ```json
    {
        id: 4,
        title: "Study HTTP",
        description: "Read the documentation.",
        userId: 1
    }
    ```
- Now, we need an interface and the logic to create users.
    - A new route to users.
    - New web API users.
    - New users services.
- **Rule**: a task can only be accessed by its user. 

### User Route

- New route in `tasks-server.mjs`:
    ```javascript
    // add user
    app.post("/users", usersAPI.addUser);
    ```

### Identifying the User: Token

- HTTP is stateless: each request is responded independently from others.
    - There is no context (*e.g.*, who is the user).
- Some ways to maintain a state in HTTP:
    - Token in a header, cookies, parameters in the URI.
- **Rule**: the owner user from a task is identified by a **token**.
    - Client must always send its token in the header to identify its user.

### Create User Service

- A user should have an username, an id, and a token.
- Token is a UUID, determined by crypto node module.
    - Universally Unique Identifier (UUID) is a 128-bit value used to identify information.
    ```javascript
    import crypto from 'node:crypto';

    token = crypto.randomUUID();
    ```
- Example:
    ```json
    {
        id: 1,
        name: "asilva",
        token: "b0506867-77c3-4142-9437-1f627deebd67"
    }
    ```

### CRUD Tasks: New Rules for an User

- `getAllTasks`: filter tasks from the user given a token.
- `getTask`, `deleteTask`, `updateTask`: verify if task belongs to the user.
- `addTask`: get the userId given a token and create a task with this userId.
- Notes:
    - In all cases, a token should be informed in the HTTP request.
    - Where? In the Header Authentication.

### Token: Header Authentication

- In this example, the token is always forwarded in the **Authentication** header.
    - https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication
- Header Authentication is used for access control and authentication in HTTP requests.
    - It contains the credentials to authenticate a user agent with a server.
- Syntax:
    ```
    Authorization: <type> <credentials>
    ```
- In this example, we will use:
    - **type**: Bearer.
    - **credential**: the token string.

### Implementing the New Rules

- All in *services* file module.
    - For users: `users-services.mjs`
    - For tasks: `tasks-services.mjs`

#### Creating User

- Returns false if the username already exists.
- Otherwise, returns the new user with a randomUUID token.

    ```javascript
    export function addUser(username){
        if (USERS.find(user => username == user.name)){
            return false;
        }
        else {
            let user = {
                id: nextId(),
                token: crypto.randomUUID(),
                name: username
            };
            USERS.push(user);
            return true;
        }
    }
    ```

#### Getting User Id from a Token

- This function is useful for task handlers.
    ```javascript
    export function getUserId(token){
        let user = USERS.find(user => user.token == token);
        if (user)
            return user.id;
    }
    ```

#### Getting All Tasks

- Now, `getAllTasks` method expects an user token as input.
- This function should filter the tasks by the user ID.
    ```javascript
    export function getAllTasks(userToken){
        const userId = usersServices.getUserId(userToken);
        return TASKS.filter(task => task.userId == userId);
    }
    ```

#### Getting a Task by Id

- Now, `getTask` method expects an user token as input, besides the task id.
- This function should find only the task id with the user id.
    ```javascript
    export function getTask(taskId, userToken){
        const userId = usersServices.getUserId(userToken);
        const task = TASKS.find(
            task => (task.id == taskId && task.userId == userId)
        );
        return task;
    }
    ```

#### Adding a Task

- Now, `addTask` method expects the newTask and a user token as input.
    ```javascript
    export function addTask(newTask, userToken){
        const userId = usersServices.getUserId(userToken);
        let task = {
            id: nextId(),
            title: newTask.title,
            description: newTask.description,
            userId: userId
        }
        TASKS.push(task);
        return task;
    }
    ```

#### Deleting a Task by Id

- Now, `deleteTask` method expects the id of a task and a user token as input.
    ```javascript
    export function deleteTask(idTask, userToken){
    let tasks = TASKS;
    const userId = usersServices.getUserId(userToken);
        let taskIndex = tasks.findIndex(
            task => (task.id == idTask && task.userId == userId)
        );
        if (taskIndex != -1){
            let task = tasks[taskIndex];
            // Usage: array.splice(startIndex, deleteCount)
            tasks.splice(taskIndex, 1);
            return(task);
        }
    }
    ```

#### Updating a Task by Id

- Now, `updateTask` method expects the id of a task, the newTask and a user token as input. 
    ```javascript
    export function updateTask(idTask, newTask, userToken){
        let tasks = TASKS;
        const userId = usersServices.getUserId(userToken);
        let taskIndex = tasks.findIndex(
            task => (task.id == idTask && task.userId == userId)
        );
        if (taskIndex != -1){
            tasks[taskIndex].title = newTask.title;
            tasks[taskIndex].description = newTask.description;
            return tasks[taskIndex];
        }
    }
    ```

### Complete Code
- Available at: [example-tasks-users/](example-tasks-users/)

### Testing with Rest Client

- Now, to request a task, we need to indicate the token.
- Example (supposing a user token already created):
    - Define the variable: `@token = f1d1cdbc-97f0-41c4-b206-051250684b19`

    ```http
    ### Insert a task

    POST http://localhost:8000/tasks HTTP/2
    Content-Type: application/json
    Authorization: Bearer {{token}}

    {
        "title": "Study HTTP",
        "description": "Read the documentation."
    }

    ### Get all tasks

    GET http://localhost:8000/tasks HTTP/2
    Authorization: Bearer {{token}}
    ```

-----------------

## OpenAPI

- OpenAPI Specification (formerly Swagger Specification) is an API description format for REST APIs.
    - https://swagger.io/specification/
- The OpenAPI Specification (OAS) was donated to the Linux Foundation under the OpenAPI Initiative in 2015.
    - https://github.com/OAI/OpenAPI-Specification

### Key Features of OpenAPI
- **Standardized Format**: YAML or JSON format for API definitions.
- **Interactive Documentation**: Tools like Swagger UI that generate interactive documentation.
- **Code Generation**: Automatically generate client libraries, server stubs, and even API documentation from specifications.
    - https://swagger.io/docs/specification/v3_0/about/

### Core Components of an OpenAPI Document
- **Basic Structure**:
    - `openapi`: The version of the OpenAPI Specification.
    - `info`: Metadata about the API (title, version, description).
    - `server`: Defines server URLs where the API is hosted.
    - `security`: Authentication and authorization schemes.
    - `paths`: The available endpoints and their operations.
    - `components`: Reusable components (schemas, parameters, responses).

### OpenAPI Specification Structure

- Format: YAML or JSON.
- YAML: YAML is a human-readable data serialization language. 
- Example of YAML Structure (metadata and servers):
    ```yaml
    openapi: 3.0.0
    info:
        title: Sample API
        description: Optional multiline or single-line description in [CommonMark](http://commonmark.org/help/) or HTML.
        version: 0.1.9

    servers:
        - url: http://api.example.com/v1
            description: Optional server description, e.g. Main (production) server
        - url: http://staging-api.example.com
            description: Optional server description, e.g. Internal staging server for testing
    ```

### Defining API Endpoints with OpenAPI

- Paths Object:
    - Specifies each resource path and available operations (GET, POST, etc.).
    - Each operation contains details like parameters, responses, and request bodies.
    ```yaml
    paths:
        /users:
            description: Optional extended description in CommonMark or HTML.
            get:
                summary: Returns a list of users.
                description: Optional extended description in CommonMark or HTML.
                responses:
                    "200": # status code
                    description: A JSON array of user names
                    content:
                        application/json:
                        schema:
                            type: array
                            items:
                                type: string
    ```

### OpenAPI for Tasks Web API

- A web API contains: 
    - **Resources**: identified by an URI; 
    - **Operations**: what operations each resource supports (*e.g.*, GET, PUT, POST, DELETE).
- For each resource we must define its valid operations. 
- For each operation we must define: 
    - **Request**:
        - What (method);
        - Where:
            - resource URI;
            - additional information (*e.g.*, query string), if any.
        - Headers, if any;
        - Body (if any).
    - **Responses** (possible responses):
        - Status code;
        - Headers, if any;
        - Body, if any.

### OpenAPI for Tasks: Metadata, Servers, Security

- First, define:
    - metadata: OpenAPI Version and basic information.
    - servers: list of server (description and URL).
    - security: global security reference.

    ```yaml
    openapi: 3.0.1
    info:
        title: Tasks API
        description: This is a simple API for managing tasks
        contact:
            email: myemail@isel.pt
        license:
            name: Apache 2.0
            url: http://www.apache.org/licenses/LICENSE-2.0.html
        version: 1.0.0
    servers:
        - description: Localhost server for testing API
        url: http://localhost:8000

    security:
        - bearerAuth: []

    components:
        securitySchemes:
            bearerAuth:  # arbitrary name for the security scheme
                type: http
                scheme: bearer
    ```
- Security: https://swagger.io/docs/specification/v3_0/authentication/ 
    - Security scheme is defined in a component.
    - In our case, the scheme is Bearer HTTP.

### OpenAPI for Tasks: Resources and Operations

- Paths of the resources:

    ```yaml
    paths:
        /users: ...
        /tasks: ...
        /tasks/{id}: ...
    ```
- Operations:
    ```yaml
    paths:
        /users:
            post: ...
        /tasks:
            get: ...
        /tasks/{id}:
            get: ...
            post: ...
            put: ...
            delete: ...
    ```

### OpenAPI for Tasks: Get All Tasks

- Details of the get operation for the resource path `/tasks` (and its components):
```yaml
    paths:
        /tasks:
            description: Resource that contains all Tasks
            get:
                summary: get Tasks
                description: By passing in the appropriate options, you can search for available Tasks
                operationId: getAllTasks
                responses:
                    200:
                        description: get all tasks from a user 
                        content:
                            application/json:
                            schema:
                                type: array
                                items:
                                    $ref: '#/components/schemas/Task'
                    400:
                        description: Bad request.
    components:
        schemas:
            NewTask:
                type: object
                required:
                    - title
                properties:
                    title:
                        type: string
                        example: Study HTTP
                    description:
                        type: string
                        example: Read the HTTP documentation.
            Task:
                allOf: # combine schemes
                    - $ref: "#/components/schemas/NewTask"
                    - type: object
                        required:
                            - id
                            - userId
                        properties:
                            id:
                                type: integer
                                example: 1
                            userId:
                                type: integer
                                example: 123
```

### OpenAPI for Tasks: Add a Task

- Details of the post operation for the resource path `/tasks` (and its components):

    ```yaml
    paths:
        /tasks:
            post:
                tags:
                    - Tasks
                summary: adds a task
                description: Adds a task to the system
                operationId: addTask
                security:
                    - bearerAuth: [] # Redundant
                requestBody:
                    description: Task to add
                    content:
                        application/json:
                            schema:
                            $ref: "#/components/schemas/NewTask"
                responses:
                    201:
                        description: Task created
                        content:
                            application/json:
                            schema:
                                $ref: "#/components/schemas/NewTaskCreated"
                    400:
                        description: Invalid input, object invalid
                        content: {}
    components:
        schemas:
            NewTaskCreated:
                required:
                    - status
                    - task
                type: object
                properties:
                    status:
                        type: string
                        example: Task with id 123 created with success
                    task:
                        $ref: "#/components/schemas/Task"
    ```

### OpenAPI for Tasks: Get a Task by ID

- Details of the post operation for the resource path `/tasks/{id}` (and its components):
    ```yaml
    paths:
        /tasks/{taskId}:
            description: The resource that represents one Task
            get:
                tags:
                    - Tasks
                summary: Get a task given its id
                operationId: getTaskById
                security:   # Redundant
                    - bearerAuth: []
                parameters:
                    - name: taskId
                    in: path
                    description: ID of task that to be fetched
                    required: true
                    schema:
                        type: integer
                        minimum: 0
                responses:
                    200:
                        description: successful operation
                        content:
                            application/json:
                            schema:
                                $ref: "#/components/schemas/Task"
                    400:
                        $ref: "#/components/responses/400BadRequest"
                    404:
                        $ref: "#/components/responses/404NotFound"
    components:
        MissingParameter:
            type: object
            properties:
                code:
                    type: integer
                    example: 1
                error:
                    type: string
                    example: "Missing required parameter"
        InvalidBody:
            type: object
            properties:
                error:
                    type: string
                    example: "Invalid body content"
        NotFound:
            type: object
            properties:
                uri:
                    type: string
                    format: uri
                    example: "/tasks/1"
                description:
                    type: string
                    example: "Task with id 1 not found"
        responses:
            404NotFound:
                description: "Resource not found"
                content:
                    application/json:
                    schema:
                        $ref: "#/components/schemas/NotFound"
            400BadRequest:
                description: "Invalid Request because of a missing Parameter or invalid body content"
                content:
                    application/json:
                    schema:
                        oneOf:
                        - $ref: "#/components/schemas/MissingParameter"
                        - $ref: "#/components/schemas/InvalidBody"    