# Improving the Web API: OpenAPI Specification Compliance

This lesson consists of showing some improvements of the **Tasks Web API** (our case study application) related to the OpenAPI Specification.
1. Organize modules in directories according their functionalities.
2. Adjust the API code to comply with the OpenAPI specification.
3. Include the Unauthorized status code (401) in the OpenAPI specification, related to the missing token.
    - Implement token missing check in web app API to comply with the 401 Unauthorized status code.
4. Implement modules for errors (internal and HTTP) and use promise-catch structure to handle the errors.
5. Refactor data module with asynchronous operations.
    - Other modules may change too.

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
         |    └─── tasks-api.yaml
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
    export function addUser(username){
        // TODO: need to verify if username already exists
        // in the array USERS and, then, indicate an error.
        let user = {
            id: nextId(),
            token: crypto.randomUUID(),
            name: username
        };
        USERS.push(user);
        return user.token;
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
    export function getAllTasks(userToken){
        const userId = usersServices.getUserId(userToken);
        // TODO: need to verify if userId exists.
        return tasksServices.getAllTasks(userId);
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
            UserNotFound:
                type: object
                properties:
                    code:
                        type: integer
                        example: 6
                    error:
                        type: string
                        example: "User not found."
    responses:
        401Unauthorized:
            description: "Access to the resource is unauthorized."
            content:
                application/json:
                schema:
                    oneOf:
                        - $ref: "#/components/schemas/MissingToken"
                        - $ref: "#/components/schemas/Unauthorized"
                        - $ref: "#/components/schemas/UserNotFound"
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
                res.status(401);
                return res.send({
                    code: 3,
                    error: "Missing Token"
                });
            }
            req.userToken = token;
            return operation(req, res);
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

## Code (Version 1.0.0)
- The project of the code implemented until now is available at:
    - [example-tasks-v1.0.0](example-tasks-v1.0.0/)

## Next Lesson
- Next lesson, we will see the implementation of the rest of the improvement: part 4 and 5.
