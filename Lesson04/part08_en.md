# Asynchronous Programming

## Synchronous *vs.* Asynchronous

- Sync program:
    - When you call a function that performs a long-running action, it returns only when the action has finished and it can return the result. 
    - This stops your program for the time the action takes.
- Async program:
    - Allows multiple things to happen at the same time. 
    - When you start an action, your program continues to run. 
    - When the action finishes, the program is informed and gets access to the result.
- Example (from the book *Eloquent JavaScript*):

<img src="https://eloquentjavascript.net/img/control-io.svg">



## JavaScript Asynchronous
- Two ways to implement:
    - Callback: 
        - The async function starts a (typically long) process with a **callback** function that is called when the process finishes.
        - Generally hard to read/write, debug and handle errors.
    - **Promises**: 
        - It is an object returned by an async function, which represents the current state of the operation.

### Async Functions
- Functions that start but eventually finish later with some result.
    - Generally, receives a callback as parameter to process the result.
- Examples:
    - `setTimeout`: wait time to start a callback function;
    - Read/write from/to a file;
    - Get a data from a client;
    - Mouse events, as onclick;
    - Web page loaded;
    - ...


### Callback Example with setTimeout
- A simple example with the async function: `setTimeout`
    - https://developer.mozilla.org/en-US/docs/Web/API/setTimeout
- This function set a callback to be executed when a given number of milliseconds has elapsed (timeout).
    ```js
    setTimeout(() => console.log("Ok!"), 1000);
    ```
    - The callback function is `() => console.log("Ok!")`
    - In this example, the program wait 1s (= 1000 ms).
    - setTimeout **returns immediately** after register the callback.
- Example:
    ```js
    // Asynchronous function with asynchronous implementation
    function longOperationAsyncWithCallback(v, cb) {
        // Simulating a long operation with setTimeout
        setTimeout(() => cb(v), 3000); // 3s
        console.log("Timeout was set!");
    }

    function processResult(result) {
        console.log("processResult");
        console.log(result); // Do something with the result
    }

    // Async model with callback
    longOperationAsyncWithCallback(10, processResult);
    console.log("END");
    ```
    - This example is available at: [examples/sync-async.js](examples/sync-async.js).

## Promise
- **[Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)**: "The Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value."
    - That is, an object that is returned to handle the promise of a result in the future.
- States of a promise:
    - *pending*: initial state, neither fulfilled nor rejected.
    - *fulfilled*: meaning that the operation was completed successfully.
    - *rejected*: meaning that the operation failed.

### Defining a Promise
- The code that produces.
- Syntax of a Promise() constructor:
    ```javascript
    new Promise(executor)
    ```
- `executor` is a callback function that receives two functions as parameters:
    - `resolveFunc`: when successful. 
    - `rejectFunc`: when error.
- Example:
    ```js
    const a = 1;
    const promise1 = new Promise(function(resolve, reject) {
        if(! Number(a)) {
            reject("'a' must be a number");
        }
        // Do something (long operation) and resolve
        setTimeout(() => resolve(a), 3000);   
    });
    ```

### Promise Method: then
- The code that consumes in case of success (on fulfilled).
- Syntax of method `then`:
    ```javascript
    then(onFulfilled)
    then(onFulfilled, onRejected)
    ```
- `onFulfilled`: a function to asynchronously execute when this promise becomes fulfilled.
- `onRejected` (optional): a function to asynchronously execute when this promise becomes rejected.
- **Return**:
    - A new Promise immediately, in the pending state.
- Example where `processResult` is associated to `resolve`:
    ```javascript
    function processResult(v){
        console.log(v, "is a number");
    }

    promise1.then(processResult);
    ```
- Example with error:
    ```javascript
    function processResult(v){
        console.log(v, "is a number");
    }
    function processError(v){
        console.error(v);
    }

    promise1.then(processResult, processError);
    ```

### Promise Method: catch
- The code that consumes in case of failure (on rejected).
- Syntax of method `catch`:
    ```javascript
    catch(onRejected)
    ```
- `onRejected`: a function to asynchronously execute when this promise becomes rejected.
- **Return**:
    - A new Promise immediately, in the pending state.
- Example:
    ```javascript
    function processResult(v){
        console.log(v, "is a number");
    }
    function processError(v){
        console.error(v);
    }

    promise1.then(processResult)
            .catch(processError);
    ```

### Example with setTimeout
- `setTimeout` is used to simulate an async long operation.
    ```js
    function longOperationAsyncWithPromise(a) {
        return new Promise(function(resolve, reject) {
            if(!Number(a)) {
                reject("A must be a number")
            }
            // Simulating a long operation with setTimeout
            setTimeout(() => resolve(a.toString()), 3000)    
        })
    }

    function processResult(result) {
        console.log("processResult");
        console.log(result, "is a number"); // Do something with the result
    }

    function processError(result) {
        console.log("processError");
        console.log(result); // Do something with the result
    }

    // Async model with Promise
    longOperationAsyncWithPromise("abc")
        .then(processResult)
        .catch(processError);
    ```
- This example is available at [examples/sync-async.js](examples/sync-async.js).

## JavaScript Single-threaded 
- JavaScript has one single thread to handle the events.
    - That is, there is no parallelism.
- Async functions (*e.g.*, file system I/O, network I/O) only interrupt the processing.
    - While waiting the interrupt come back, the processor can be used by another operation.
- The follow example shows a blocked JavaScript program to illustrate this behavior.
    - [examples/deadly-javascript-sin.js](examples/deadly-javascript-sin.js)
    - `setTimeout` async function never has CPU to set `x = 1` because while-loop is always using the CPU.