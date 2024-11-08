# Improving the Web API: OpenAPI Specification Compliance

This lesson consists of showing some improvements of the **Tasks Web API** (our case study application) related to the OpenAPI Specification.
1. Organize modules in directories according their functionalities.
2. Adjust the API code to comply with the OpenAPI specification.
3. Include the Unauthorized status code (401) in the OpenAPI specification, related to the missing token.
    - Implement token missing check in web app API to comply with the 401 Unauthorized status code.
5. Implement a module for errors and use try-catch structure.
6. Refactor data module with asynchronous operations.

## 1. Directory Organization

- Organize modules in directories:
    - **commons**: modules that are common to all or a set of other modules.
    - **data**: data content (*e.g.*, users, tasks).
    - **services**: service modules with application logic.
    - **web**: web part, such as API and representation files (*e.g.*, HTML).
    ```tree
    └─── example-tasks/
         ├─── package.json
         ├─── tasks-server.mjs
         ├─── docs/
         |    └─── tasks-api-yaml
         ├─── commons/
         ├─── data/
         |    └─── tasks-data.mjs
         ├─── services/
         |    ├─── tasks-services.mjs
         |    └─── users-services.mjs
         └─── web/
              └─── api/
                   ├─── tasks-web-api.mjs
                   └─── users-web-api.mjs
    ```

## 2. OpenAPI Specification Compliance

### Users: Add User

- Specification says:

    ```yaml
    /users:
        description: The resource that contains all users
        post:
            tags:
                - Users
            summary: adds a user
            description: Adds a user to the system
            operationId: addUser
            security: []  # Remove the need for authorization
            requestBody:
                description: User to add
                content:
                application/json:
                    schema:
                    $ref: "#/components/schemas/NewUser"
                required: true
            responses:
                201:
                    description: user created
                    content:
                        application/json:
                        schema:
                            required:
                            - token
                            type: object
                            properties:
                            token:
                                type: string
                                format: uuid
                400: # Username already exists.
                    description: Invalid input, object invalid
                    $ref: "#/components/responses/400BadRequest"  
    ```
- NewUser component:
    ```yaml
    NewUser:
        type: object
        required:
            - username
        properties:
            username:
            type: string
            example: asilva    
    ```
- The code should be:
    ```javascript
    export function addUser(req, res){
        const userToken = usersServices.addUser(req.body.username);
        if (userToken){
            res.status(201);
            res.send({token: userToken});
        }
        else{
            res.status(400);
            res.send({
                code: 1,
                error: "Body is invalid."
            });
        }
    }
    ```

### Tasks

#### Get All Tasks

- OpenAPI specification:
    ```yaml
    /tasks:
        description: Resource that contains all Tasks
        get:
            tags:
                - Tasks
            summary: get Tasks
            description: Get all tasks from an specified user (by token).
            operationId: getAllTasks
            responses:
                200:
                description: In case of success, returns a list of tasks.
                content:
                    application/json:
                    schema:
                        type: array
                        items:
                            $ref: "#/components/schemas/Task"
    ```
- OpenAPI `Task` component:
    ```yaml
    NewTask:
      required:
        - title
      type: object
      properties:
        title:
          type: string
          example: Study HTTP
        description:
          type: string
          example: Read the HTTP documentation.
    Task:
      allOf:
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
              example: 1    
    ```
- The corresponding code should be:
    ```javascript
    function getAllTasks(req, res){
        const userToken = getToken(req);
        res.json(tasksServices.getAllTasks(userToken));
    }
    ```
    - This code complies with the HTTP response specification because `tasksServices.getAllTasks()` returns an object such as:
        ```json
        [
            {
                "id": 1,
                "title": "Task 1",
                "description": "Task 1 description",
                "userId": 2
            },
            {
                "id": 3,
                "title": "Task 3",
                "description": "Task 3 description",
                "userId": 2
            }
        ]
        ```

#### Add Task

- OpenAPI specification:
    ```yaml
    /tasks:
        description: Resource that contains all Tasks
        post:
            tags:
                - Tasks
            summary: adds a task
            description: Adds a task to the system
            operationId: addTask
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
                400: # Post body is invalid
                $ref: "#/components/responses/400BadRequest"
            
    ```
- OpenAPI `Task` component:
    ```yaml
    NewTask:
      required:
        - title
      type: object
      properties:
        title:
          type: string
          example: Study HTTP
        description:
          type: string
          example: Read the HTTP documentation.
    Task:
      allOf:
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
              example: 1
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
- OpenAPI responses schemas:
    ```yaml
    responses:
    400BadRequest:
      description: "Invalid Request because of a missing Parameter or invalid body content"
      content:
        application/json:
          schema:
            oneOf:
              - $ref: "#/components/schemas/MissingParameter"
              - $ref: "#/components/schemas/InvalidBody"  
    ```
- OpenAPI `InvalidBody` component:
    ```yaml
    InvalidBody:
      type: object
      properties:
        code:
          type: integer
          example: 1
        error:
          type: string
          example: "Invalid body content"
    ```
- The corresponding code should be (still without 400 status code implementation):
    ```javascript
    function addTask(req, res){
        const userToken = getToken(req);
        // TODO: For status code 400, need to verify body properties (in tasksServices).
        let task = tasksServices.addTask(req.body, userToken);
        if (task){
            res.status(201);
            res.send({
                status: `Task ${task.id} was added!`,
                task: task
            });
        }
    }
    ```
    - This code complies with the HTTP response specification because `tasksServices.getTask()` returns an object such as:
        ```json
        {
            "status": "Task 10 was added!",
            "task": {
                "id": 10,
                "title": "Task 10",
                "description": "Task 10 description",
                "userId": 2
            }
        }
        ```

#### Get Task by Id

- OpenAPI Specification:

    ```yaml
    /tasks/{taskId}:
        description: The resource that represents one Task
        get:
            tags:
                - Tasks
            summary: Get a task given its id
            operationId: getTaskById
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
    ```

- Correspondent API function (without implement status code 400 Bad Request):

    ```javascript
    function getTask(req, res){
        const userToken = getToken(req);
        const taskId = req.params.taskId;
        // TODO: For status code 400, need to verify taskId (in tasksServices).
        let task = tasksServices.getTask(taskId, userToken);
        if (task)
            res.send(task);
        else{
            res.status(404);
            res.send({
                code: 404, 
                description: `Task with id ${taskId} not found.`
            });
        }
    }
    ```

#### Update Task by Id

- OpenAPI Specification:
    ```yaml
    /tasks/{taskId}:
        description: The resource that represents one Task
        put:
            tags:
                - Tasks
            summary: updates a task
            description: Updates a Task in the system
            operationId: updateTask
            parameters:
                - name: taskId
                in: path
                description: ID of the task to be deleted
                required: true
                schema:
                    type: integer
            requestBody:
                description: Task to add
                content:
                    application/json:
                        schema:
                            $ref: "#/components/schemas/NewTask"
            responses:
                201:
                    description: task updated
                    content: {}
                404:
                    $ref: "#/components/responses/404NotFound"
                400:
                    $ref: "#/components/responses/400BadRequest"
    ```
- NewTask schema component:
    ```yaml
    NewTask:
      required:
        - title
      type: object
      properties:
        title:
          type: string
          example: Study HTTP
        description:
          type: string
          example: Read the HTTP documentation.    
    ```

- Correspondent API function (without implement status code 400 Bad Request):
    ```javascript
    function updateTask(req, res){
        const userToken = getToken(req);
        const taskId = req.params.taskId;
        // TODO: For status code 400, need to verify taskId and body properties (in tasksServices).
        let updatedTask = tasksServices.updateTask(taskId, req.body, userToken);
        if (updatedTask){
            res.json({});
        }
        else{
            res.status(404);
            res.send({
                code: 1, 
                description: `Task with id ${taskId} not found.`
            });
        }
    }
    ```

#### Delete Task by Id

- OpenAPI Specification:
    ```yaml
    /tasks/{taskId}:
        description: The resource that represents one Task
        delete:
            tags:
                - Tasks
            summary: Delete a task by ID
            description: Delete a task by ID
            operationId: deleteTask
            parameters:
                - name: taskId
                in: path
                description: ID of the task to be deleted
                required: true
                schema:
                    type: integer
            responses:
                200:
                    description: "Task successfully deleted"
                    content: {}
                400:
                    $ref: "#/components/responses/400BadRequest"
                404:
                    $ref: "#/components/responses/404NotFound"
    ```

- Correspondent API function (without implement status code 400 Bad Request):
    ```javascript
    function deleteTask(req, res){
        const userToken = getToken(req);
        const taskId = req.params.taskId;
        // TODO: For status code 400, need to verify taskId (in tasksServices).
        let deleteTask = tasksServices.deleteTask(taskId, userToken);
        if (deleteTask){
            res.json({});
        }
        else{
            res.status(404);
            res.send({
                code: 1, 
                description: `Task id ${taskId} not found.`
            });
        }
    }    
    ```

## 3. Unauthorized Status Code: Specification

- We need to add to the OpenAPI Spec a new component and response type:
    ```yaml
    components:
        schemas:
            MissingToken:
                type: object
                properties:
                    code:
                        type: integer
                        example: 4
                    error:
                        type: string
                        example: "Missing token."
            Unauthorized:
                type: object
                properties:
                    code:
                        type: integer
                        example: 5
                    error:
                        type: string
                        example: "User 1 has no authorization."
    responses:
        401Unauthorized:
            description: "Access to the resource is unauthorized."
            content:
                application/json:
                schema:
                    oneOf:
                        - $ref: "#/components/schemas/MissingToken"
                        - $ref: "#/components/schemas/Unauthorized"
    ```

### Implementing Token Missing

- The verification of token missing is processed for all tasks operation.
- For this reason, a more generic function is need to process the request.
- This function returns a function that represents the operation (getAllTasks, getTask, addTask, deleteTask, and updateTask).
    - Name of this function: `processRequest`.
    - Input parameter:
        - `operation`: an API operation handler function.
    - The returned function corresponds to the operation that receives `req` and `res` as argument.
    - The token is associated to a new property in request object, `req.userToken`.
        - Then, the operation function can access the token through the request.
- Therefore, the function `processRequest` is:
    ```javascript
    function processRequest(operation){
        return function (req, res){
            const token = getToken(req);
            if (! token){
                res.status(401).send({error: "Missing token!"});
                return;
            }
            req.userToken = token;
            operation(req, res);
        };
    }
    ```
- Now, we can call `processRequest` to associate the returned function to the API operation:
    ```javascript
    export const getAllTasks = processRequest(local_getAllTasks);
    export const getTask = processRequest(local_getTask);
    export const addTask = processRequest(local_addTask);
    export const updateTask = processRequest(local_updateTask);
    export const deleteTask = processRequest(local_deleteTask);
    ```
- Every API function receives the prefix `local_` to differ the API exported function.
    - So, these functions are not exported anymore.
    - Example (`local_getAllTasks`):
        ```javascript
        function local_getAllTasks(req, res){
            res.json(tasksServices.getAllTasks(req.userToken));
        }
        ```

## 4. Handling Errors

- To handling errors, we will use now JavaScript structures for this propose.
    - `throw`: throws a defined error.
    - `try-catch` structure:
        - tries to execute an operation surrounded by `try` structure and catches an error, if any part of this operation throws an error.
- Methodology:
    1. Define internal expected errors, with internal id code (*e.g.*, 3);
    2. Map internal error to HTTP status code error;
    3. 


### Expected Errors
- General:
    - MISSING_TOKEN: Missing token (401 Unauthorized).
    - default: Server internal error (500 Internal Error).
- `addUser(username)`:
    - INVALID_BODY: Username already exists, body is invalid (400 Bad Request).
- `getAllTasks(userToken)`:
    - USER_NOT_FOUND: User is not found (401 Unauthorized).
- `getTask(taskId, userToken)`, `deleteTask(taskId, userToken)`:
    - USER_NOT_FOUND: User is not found (401 Unauthorized).
    - TASK_NOT_FOUND: Task is not found (404 Not Found).
    - NOT_AUTHORIZED: User has no access to the provided task (401 Unauthorized).
    - INVALID_PARAMETER: taskId is invalid, parameter is invalid (400 Bad Request).
- `update(taskId, newTask, userToken)`:
    - USER_NOT_FOUND: User is not found (401 Unauthorized).
    - TASK_NOT_FOUND: Task is not found (404 Not Found).
    - NOT_AUTHORIZED: User has no access to the provided task (401 Unauthorized).
    - INVALID_PARAMETER: taskId is invalid, parameter is invalid (400 Bad Request).
    - INVALID_BODY: Body is invalid (400 Bad Request).

### Common Errors

- A module in `commons/errors.mjs`:
    ```javascript
    export const INTERNAL_ERROR_CODES = {
        INVALID_PARAMETER: 1,
        INVALID_BODY: 2,
        TASK_NOT_FOUND: 3,
        USER_NOT_FOUND: 4,
        NOT_AUTHORIZED: 5,
        MISSING_TOKEN: 6
    };

    export const errors = {
        INVALID_PARAMETER: (argName) => {
            return new Error(INTERNAL_ERROR_CODES.INVALID_PARAMETER, `Invalid parameter ${argName}`);
        },
        INVALID_BODY: (argName) => {
            return new Error(INTERNAL_ERROR_CODES.INVALID_BODY, `Invalid body ${argName}`);
        },
        TASK_NOT_FOUND: (what) => { 
            return new Error(INTERNAL_ERROR_CODES.NOT_FOUND,`Task ${what} not found`);
        },
        USER_NOT_FOUND: () => { 
            return new Error(INTERNAL_ERROR_CODES.USER_NOT_FOUND,`User not found`);
        },
        NOT_AUTHORIZED: (who, what) => { 
            return new Error(INTERNAL_ERROR_CODES.NOT_AUTHORIZED,`${who} has no access to ${what}`);
        },
        MISSING_TOKEN: () => { 
            return new Error(INTERNAL_ERROR_CODES.MISSING_TOKEN,`Missing token`);
        }
    }

    // Constructor function
    function Error(code, description) {
        this.code = code;
        this.description = description;
    }
    ```


### Internal Errors to HTTP Status Code Converter

- In web/api, include a module to convert internal API errors to HTTP status code error.
- The file name can be: `web/api/errors-to-http-responses.mjs`.

    ```javascript
    import { INTERNAL_ERROR_CODES } from '../../common/errors.mjs';

    function HttpResponse(status, e) {
        this.status = status;
        this.body = {
            code: e.code, // internal code
            error: e.description
        };
    }

    export default function(e) {
        switch(e.code) {
            case INTERNAL_ERROR_CODES.INVALID_PARAMETER: return new HttpResponse(400, e);
            case INTERNAL_ERROR_CODES.INVALID_BODY: return new HttpResponse(400, e);
            case INTERNAL_ERROR_CODES.TASK_NOT_FOUND: return new HttpResponse(404, e);
            case INTERNAL_ERROR_CODES.USER_NOT_FOUND: return new HttpResponse(401, e);
            case INTERNAL_ERROR_CODES.NOT_AUTHORIZED: return new HttpResponse(401, e);
            case INTERNAL_ERROR_CODES.MISSING_TOKEN: return new HttpResponse(401, e)
            default: return new HttpResponse(500, "Internal server error. Contact your teacher!");
        }
    }
    ```

### Usage of the Converter

- In `services/tasks-service.mjs`, such as:

## 5. Data Module
