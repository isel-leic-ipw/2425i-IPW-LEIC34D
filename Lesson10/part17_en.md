# Dependency Injection

## Definition

- Dependency injection is a software design pattern allowing a program to follow a more modular and decoupled architecture.
- In this pattern, a module receives its dependencies from an external source rather than creating them itself. 
- In node.js, this can be done through:
    - Creating a wrapper init function for each module and defining the interface.
    - Using `export default` for this function.


## Export Default

- Exports a primary object, functions, or variables from a module.
- This type of export allows you to import the value using any name.
- Provides flexibility and simplifies the import process for the main content of the module.
- Example with **variable**:
    - Module `./ex1.mjs`:
        ```javascript
        let x = 3;
        let y = x**2 - x + 3;
        export default y;
        ```
    - Module `./ex2.mjs` that depends of `./ex1.mjs`:
        ```javascript
        import z from 'ex1.mjs';
        console.log(z);
        ```
- Example with **function**:
    - Module `./ex3.mjs`:
        ```javascript
        let x = 3;
        function getY(){
            let y = x**2 - x + 3;
            return y;
        }
        export default getY;
        ```
    - Module `./ex4.mjs` that depends of `./ex3.mjs`:
        ```javascript
        import getZ from './ex3.mjs';
        console.log(getZ());
        ```

## Wrapper Init Function and Interface

- The init function wraps the functions to be exported and returns each one as an object.
- As a simple example, consider four modules with the following dependency diagram:
    ```
    main --> module1 --> module2
                     --> module3
    ```

### Without dependency injection

- `module2.mjs`:
    ```javascript
    // Module 2
    export function printHello(name){
        console.log("Hello " + name);
    }
    ```
- `module3.mjs`
    ```javascript
    // Module 3
    export function printSum(a, b){
        console.log(a + b);
    }
    ```
- Module `module1.mjs` depends of `module2.mjs` and `module3.mjs`:
    ```javascript
    // Module 1
    import * as m2 from './module2.mjs';
    import * as m3 from './module3.mjs';

    export function printAll(){
        m2.printHello("Ana");
        m3.printSum(2, 3);
    }
    ```
- The main module `main.mjs`, that depends of `module1.mjs`, is:
    ```javascript
    // Main
    import * as module1 from './module1.mjs';

    module1.printAll();
    ```
- In main module, is not clear the entire dependencies of the application!

### With dependency injection

- Modules `module1.mjs`, `module2.mjs` and `module3.mjs` use an init function that wraps the functions to be exported.
    - And only the init function is exported as default.
- `module2.mjs`:
    ```javascript
    export default function init(){
        return {
            printHello: printHello
        };

        function printHello(name){
            console.log("Hello " + name);
        }
    }
    ```
- `module3.mjs`:
    ```javascript
    export default function init(){
        return {
            printSum: printSum
        };

        function printSum(a, b){
            console.log(a + b);
        }
    }
    ```
- The module `module1.mjs` needs to verify the dependencies and throws an error in case of not find a required dependency.
    ```javascript
    // Module 1
    export default function init(m2, m3){
        if (! m2){
            throw "Error: missing argument m2!";
        }
        if (! m3){
            throw "Error: missing argument m3!";
            return ;
        }

        return {
            printAll: printAll
        };

        function printAll(){
            m2.printHello("Ana");
            m3.printSum(2, 3);
        }
    }
    ```
- The module `main.mjs` needs to catch an error in case of invalid arguments.
    ```javascript
    import initM1 from './module1.mjs';
    import initM2 from './module2.mjs';
    import initM3 from './module3.mjs';

    try {
        const module3 = initM3();
        const module2 = initM2();
        const module1 = initM1(module2, module3);
        
        module1.printAll();
    } catch (err) {
        console.error(err);
    }
    ```
- Now, all dependencies are listed in a single module, the `main.mjs`.
    - So, it is clear that `module1` depends of `module2` and `module3`.
    - Since each module returns an object with the functions to be exported, the use of the functions is the same as without dependency injection.

## Tasks Web API: Dependency Injection

- In the Tasks Web API (our application example presented in the classroom), the dependencies are:

![Diagram for the Tasks API](images/diagram-tasks-api.svg)

- The main code, in module `tasks-server.mjs`, represents the dependencies as follows:
    ```javascript
    // Import all modules for Dependency Injection:
    import tasksApiInit from './web/api/tasks-web-api.mjs';
    import usersApiInit from './web/api/users-web-api.mjs';
    import taskServicesInit from './services/tasks-services.mjs';
    import userServicesInit from './services/users-services.mjs';
    //import tasksDataInit from './data/memory/tasks-data-mem.mjs';
    import tasksDataInit from './data/elastic/tasks-data-elastic.mjs';
    import usersDataInit from './data/elastic/users-data-elastic.mjs';

    // Dependency Injection:
    try{
        const tasksData = tasksDataInit();
        const usersData = usersDataInit();
        const usersServices = userServicesInit(usersData);
        const tasksServices = taskServicesInit(tasksData, usersServices);
        const tasksAPI = tasksApiInit(tasksServices);
        const usersAPI = usersApiInit(usersServices);
    }
    catch (err){ // An runtime error
        console.error(err);
    }

    if(taskAPI && userAPI){

        // Express app...
    }
    ```

- Module `web/api/tasks-web-api.mjs`:
    ```javascript
    import { errors } from "../../commons/errors.mjs";
    import {errorToHttp} from './errors-to-http-responses.mjs';

    export default function init(tasksServices){

        if(! tasksServices){
            throw errors.INVALID_ARGUMENT('tasksServices');
        }

        return ({
            ensureToken,
            handlerError,
            getAllTasks: processRequest(local_getAllTasks),
            getTask: processRequest(local_getTask),
            addTask: processRequest(local_addTask),
            updateTask: processRequest(local_updateTask),
            deleteTask: processRequest(local_deleteTask)
        });

        function processRequest(operation){ /*...*/ }

        function ensureToken(req, res, next){ /*...*/ }

        function handlerError (err, req, res, next) { /*...*/ }

        function local_getAllTasks(req, res){ /*...*/ }

        function local_getTask(req, res){ /*...*/ }

        function local_addTask(req, res){ /*...*/ }

        function local_deleteTask(req, res){ /*...*/ }

        function local_updateTask(req, res){ /*...*/ }

        // Auxiliary module function
        function getToken(req) { /*...*/ }

        function getResponseError(res, err){ /*...*/ }
    }
    ```

- Module `web/api/users-web-api.mjs`:
    ```javascript
    export default function init(usersServices){

        if(! usersServices){
            throw errors.INVALID_ARGUMENT('usersServices');
        }

        return({
            addUser
        });

        function addUser(req, res, next){ /*...*/ }
    }    
    ```

- Module `services/tasks-services.mjs`:
    ```javascript
    import { errors } from '../commons/errors.mjs';

    export default function init(tasksData, usersServices){

        if(! tasksData){
            throw errors.INVALID_ARGUMENT('tasksData');
        }

        if(! usersServices){
            throw errors.INVALID_ARGUMENT('usersServices');
        }

        return({
            getAllTasks,
            getTask,
            addTask,
            deleteTask,
            updateTask
        });

        function getTask(taskId, userToken){ /*...*/ }

        function getAllTasks(userToken){ /*...*/ }

        function addTask(newTask, userToken){ /*...*/ }

        function deleteTask(taskId, userToken){ /*...*/ }

        function updateTask(taskId, newTask, userToken){ /*...*/ }

    }    
    ```

- Module `services/users-services.mjs`:
    ```javascript
    import { errors } from '../commons/errors.mjs';

    export default function init(usersData){

        if(! usersData){
            throw errors.INVALID_ARGUMENT('usersData');
        }

        return ({
            addUser,
            getUserId
        });

        function addUser(username){
            return usersData.addUser(username);
        }

        function getUserId(token){
            return usersData.getUserIdByToken(token);
        }
    }    
    ```

- Module `data/elastic/tasks-data-elastic.mjs`:
    ```javascript
    import { errors } from "../../commons/errors.mjs";
    import { fetchElastic } from './fetch-elastic.mjs';

    export default function init(){

        return {
            verifyNewTaskProperties,
            getTask,
            getAllTasks,
            addTask,
            deleteTask,
            updateTask
        };


        function aTaskFromElastic(elasticTask) { /*...*/ }

        function verifyNewTaskProperties(newTask) { /*...*/ }

        function getTask(taskId) { /*...*/ }

        function getAllTasks(userId) { /*...*/ }

        function addTask(newTask, userId) { /*...*/ }

        function deleteTask(idTask) { /*...*/ }

        function updateTask(idTask, newTask) { /*...*/ }

    }    
    ```

- Module `data/elastic/users-data-elastic.mjs`:
    ```javascript
    import crypto from 'node:crypto';
    import { errors } from '../../commons/errors.mjs';
    import { fetchElastic } from './fetch-elastic.mjs';

    export default function init(){

        return {
            getUserIdByToken,
            addUser
        };

        function getUserId(matchObj) { /*...*/ }

        function getUserIdByName(username) { /*...*/ }

        function getUserIdByToken(token) { /*...*/ }

        function addUser(username) { /*...*/ }
    }    
    ```

## Code

- The code is available at: [example-tasks-v1.3.0/](example-tasks-v1.3.0/).
    - With a unit test with mocha for `getAllTasks` from `tasks-services.mjs` module.