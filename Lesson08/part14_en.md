# Improving the Web API: Data Module and Error Handling

This lesson consists of showing the remaining of the improvements of the **Tasks Web API** (our case study application) related to the OpenAPI Specification.

4. Refactor data module with asynchronous operations.
    - Other modules may change too.
5. Implement modules for errors (internal and HTTP) and use promise-catch structure to handle the errors.

## 4. Asynchronous Data Module

- Data module contains:
    - the data structure, *i.e.* the array, in memory;
    - some auxiliary functions;
    - functions to handler data in the array: all **asynchronous**.
- File: `data/tasks-data-mem.mjs`.
- All asynchronous functionalities are implemented using **Promises**.

### Auxiliary Functions

- Internal constructor function to build a task based on a new task, id task and user id.

    ```javascript
    function aTask(newTask, id, userId) {
        this.id = id;
        this.title = newTask.title;
        this.description = newTask.description;
        this.userId = userId;
    }
    ```

- A function to verify new task properties.
    - According to the API doc, only title is mandatory.

    ```javascript
    export function verifyNewTaskProperties(newTask) {
        // Only title is mandatory.
        if (newTask.title) return true;
        else return false;
    }
    ```

### Handling Data in the Array

- `getTask(taskId)`: returns a promise that resolves with the result of finding the task with taskId.

    ```javascript
    // Returns a Promise of a task
    export function getTask(taskId) {
        return Promise.resolve(TASKS.find(task => (task.id == taskId)));
    }
    ```

- `getAllTasks(userId)`: returns a promise that resolves with the array of tasks from the user with userId.

    ```javascript
    export function getAllTasks(userId) {
        return Promise.resolve(TASKS.filter(task => task.userId == userId));
    }
    ```

- `addTask(newTask, userId)`: returns a promise that resolves with the task added in the array TASKS.

    ```javascript
    export function addTask(newTask, userId) {
        return new Promise((resolve, reject) => {
            let task = new aTask(newTask, nextTaskId(), userId);
            TASKS.push(task);
            resolve(task);    
        });
    }
    ```

- `deleteTask(idTask)`: returns a promise that resolves with the task delete of the array TASKS.
    - The promise rejects with the internal error TASK_NOT_FOUND in case of the task was not found.

    ```javascript
    export function deleteTask(idTask) {
        return new Promise((resolve, reject) => {
            let taskIndex = TASKS.findIndex(task => (task.id == idTask));
            if (taskIndex != -1) {
                let task = TASKS[taskIndex];
                // Usage: array.splice(startIndex, deleteCount)
                TASKS.splice(taskIndex, 1);
                resolve (task);
            }
            else{
                reject(errors.TASK_NOT_FOUND(idTask));
            }
        });
    }
    ```

- `updateTask(idTask, newTask)`: returns a promise that resolves with the task updated in the array TASKS.
    - The promise rejects with the internal error TASK_NOT_FOUND in case of the task was not found.

    ```javascript
    export function updateTask(idTask, newTask) {
        return new Promise((resolve, reject) => {
            let taskIndex = TASKS.findIndex(task => (task.id == idTask));
            if (taskIndex != -1) {
                TASKS[taskIndex].title = newTask.title;
                TASKS[taskIndex].description = newTask.description;
                resolve (TASKS[taskIndex]);
            }
            else{
                reject(errors.TASK_NOT_FOUND(idTask));
            }
        });
    }
    ```


## 5. Handling Errors

- We will consider two types of errors:
    - Internal error of the application;
    - HTTP status error code.
- To handling errors, we will use reject promises and catch-promise method.
    - `Promise.reject`: throws an internal error.
    - `catch()` method: catch an internal error and convert it to a HTTP status error code.

### Expected Errors
- General:
    - MISSING_TOKEN: Missing token (401 Unauthorized).
    - default: Server internal error (500 Internal Error).
- Function `addUser(username)`:
    - INVALID_BODY: Username already exists, body is invalid (400 Bad Request).
- Function `addTask(newTask, userToken)`:
    - USER_NOT_FOUND: User is not found (401 Unauthorized).
    - INVALID_BODY: newTask not provide title property (mandatory in the documentation), body is invalid (400 Bad Request).
- Function `getAllTasks(userToken)`:
    - USER_NOT_FOUND: User is not found (401 Unauthorized).
- Functions `getTask(taskId, userToken)`, `deleteTask(taskId, userToken)`:
    - USER_NOT_FOUND: User is not found (401 Unauthorized).
    - TASK_NOT_FOUND: Task is not found (404 Not Found).
    - NOT_AUTHORIZED: User has no access to the provided task (401 Unauthorized).
    - INVALID_PARAMETER: taskId is invalid, parameter is invalid (400 Bad Request).
    - MISSING_PARAMETER: there is no taskId (400 Bad Request).
- Function `update(taskId, newTask, userToken)`:
    - USER_NOT_FOUND: User is not found (401 Unauthorized).
    - TASK_NOT_FOUND: Task is not found (404 Not Found).
    - NOT_AUTHORIZED: User has no access to the provided task (401 Unauthorized).
    - INVALID_PARAMETER: taskId is invalid, parameter is invalid (400 Bad Request).
    - MISSING_PARAMETER: there is no taskId (400 Bad Request).
    - INVALID_BODY: Body is invalid (400 Bad Request).

### Internal Common Errors

- A module in `commons/errors.mjs`:
    ```javascript
    export const INTERNAL_ERROR_CODES = {
        MISSING_PARAMETER: 1,
        INVALID_PARAMETER: 2,
        INVALID_BODY: 3,
        TASK_NOT_FOUND: 4,
        USER_NOT_FOUND: 5,
        NOT_AUTHORIZED: 6,
        MISSING_TOKEN: 7
    };

    export const errors = {
        MISSING_PARAMETER: (argName) => {
            return new Error(INTERNAL_ERROR_CODES.MISSING_PARAMETER, `Missing parameter`);
        },
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

### Throwing Error with Promise Reject

- We already see a promise rejection in tasks data module (`data/tasks-data-mem.mjs`).
- All task service functions (in `/services/tasks-services.mjs`) should return:
    - a promise of a value from tasksData and usersServices modules;
    - or a promise reject with an internal error.
- `getAllTasks()` function:
    ```javascript
    export function getAllTasks(userToken){
        return usersServices.getUserId(userToken)
            .then(userId => tasksData.getAllTasks(userId));
    }
    ```
- `addTask()` function:
    ```javascript
    export function addTask(newTask, userToken){
        return usersServices.getUserId(userToken)
            .then(userId => {
            if (! tasksData.verifyNewTaskProperties(newTask))
                return Promise.reject(errors.INVALID_BODY("new Task"));    
            return tasksData.addTask(newTask, userId);
            });
    }
    ```

- `getTask()` function:
    ```javascript
    export function getTask(taskId, userToken){

        if (! taskId)
            return Promise.reject(errors.MISSING_PARAMETER());

        if (! Number(taskId))
            return Promise.reject(errors.INVALID_PARAMETER("taskId"));
        
        const taskPromise = Promise.all([
            usersServices.getUserId(userToken), 
            tasksData.getTask(taskId)
        ]);

        return taskPromise.then( arrayValues => {
            const userId = arrayValues[0];
            const task = arrayValues[1];
            if (! task){
                return Promise.reject(errors.TASK_NOT_FOUND(taskId));
            }

            if (task.userId == userId){
                return (task);
            }
            else {
                const error = errors.NOT_AUTHORIZED(
                    `User ${userId}`, `Task ${task.id}`);
                return Promise.reject(error);
            }
        });

    }
    ```

- `deleteTask()` function:
    ```javascript
    export function deleteTask(taskId, userToken){
        // Do the same as getTask, then delete the task.
        return getTask(taskId, userToken)
            .then((task) => {
                if (! task)
                return Promise.reject(errors.TASK_NOT_FOUND(taskId));
                return task.id;
            })
            .then(tasksData.deleteTask);
    }
    ```

- `updateTask()` function:
    ```javascript
    export function updateTask(taskId, newTask, userToken){
        // Do the same as getTask, then update the task.
        return getTask(taskId, userToken)
            .then((task) => {
                if (! task)
                    return Promise.reject(errors.TASK_NOT_FOUND(taskId));
                if (! tasksData.verifyNewTaskProperties(newTask))
                    return Promise.reject(errors.INVALID_BODY("new Task"));  
                return tasksData.updateTask(task.id, newTask);
            });
    }
    ```

### Internal Errors to HTTP Status Code Converter

- In web/api, include a module to convert internal API errors to HTTP status code error.
- The file name can be: `web/api/errors-to-http-responses.mjs`.

    ```javascript
    import { INTERNAL_ERROR_CODES } from '../../commons/errors.mjs';

    function HttpResponse(status, e) {
        this.status = status;
        this.body = {
            code: e.code, // internal code
            error: e.description
        };
    }

    export function errorToHttp(e) {
        switch(e.code) {
            case INTERNAL_ERROR_CODES.MISSING_PARAMETER: return new HttpResponse(400, e);
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

- In `services/tasks-web-api.mjs`, in `processRequest` function:

    ```javascript
    function getResponseError(res, err){
        const responseError = errorToHttp(err);
        res.status(responseError.status);
        return res.json(responseError.body); 
    }

    function processRequest(operation){
        return function (req, res){
            const token = getToken(req);
            if (! token){
                return getResponseError(res, errors.MISSING_TOKEN());  
            }
            req.userToken = token;
            return operation(req, res)
                .catch( e => getResponseError(res, e));
        }
    }
    ```

### Missing Parameter Error

- The Following operations need a task Id in the path parameter input:
    - **get task by id**;
    - **delete task by id**;
    - **update task by id**.
- What happens if a client does not provide the task Id?
    - For method get, already exists a route to `/tasks` (for get all tasks).
    - For methods delete and put, does not exist.
- For the case of delete and put, the express framework will return a 404 status code and a default error message in HTML.
    - 404 status code is because does not exist the route!
    - Instead, we want the status code error 400 and provide our own message.
- To avoid this problem, we can use the question mark (?) after the taskId in the route (in `tasks-server.mjs` module):
    ```javascript
    // delete task by id
    app.delete("/tasks/:taskId?", tasksAPI.deleteTask);

    // update task by id
    app.put("/tasks/:taskId?", tasksAPI.updateTask);
    ```

## Code (Version 1.1.0)

- The code is available at: [example-tasks-v1.1.0/](example-tasks-v1.1.0/)
    - OpenAPI documentation also changed in order to include the errors.


## Safe and Idempotent HTTP Methods

- According to the [HTTP RFC](https://datatracker.ietf.org/doc/html/rfc2616), safety and idempotence are two properties of the HTTP Methods to be considered when a server is implemented.
- They ensure expected server behaviors, such as in case of connection problems (*e.g.*, failure) between client and server.

### Safe

- HTTP methods are considered **safe** if only if they do not change the server state. 
- Safe methods are read-only operations.
- The RFC defines GET, HEAD, OPTIONS and TRACE as safe methods.

### Idempotent

- HTTP methods are considered **idempotent** if only if the side-effects of N > 0 identical requests is the same as for a single request.
    - Only the state of the server is considered.
    - Responses may differ (*e.g.*, a DELETE may return 200 in first request and 404 for second).
- All safe methods are idempotent.
- The methods PUT and DELETE also have this property.
    - POST method is not idempotent because it always causes side-effects in the server.
    - PATCH method is not idempotent because it can causes side-effects in the server.
        - For instance, if a resource includes an auto-incrementing counter, a PUT request will overwrite the counter (since it replaces the entire resource), but a PATCH request may not.
- The server implementors must guarantee these properties: safety and idempotence.

