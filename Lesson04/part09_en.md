# Using Promises
- Two main examples:
    1. File System (FS) with Promise
    2. Request HTTP with fetch (and Promise)

## 1. FS-Promise Module

- File system module with promise.
    - https://nodejs.org/api/fs.html#promises-api
- The fs/promises API provides asynchronous file system methods that return promises.
- Examples of methods:
    - `readFile`: asynchronously reads the entire contents of a file.
        - https://nodejs.org/api/fs.html#fspromisesreadfilepath-options
    - `writeFile`: asynchronously writes data to a file, replacing the file if it already exists.
        - https://nodejs.org/api/fs.html#fspromiseswritefilefile-data-options

### Reading and Writing Files
- **Example 1**:
    - Objective: read the content of a local file and print it.
    - Available at: [examples/fs-promise/fs-read-print.mjs](examples/fs-promise/fs-read-print.mjs)
- **Example 2**:
    - Objective: read the first line of a local file and write this line in a new file.
    - Available at: [examples/fs-promise/fs-read-write.mjs](examples/fs-promise/fs-read-write.mjs)

- Remarks:
    - `readFile` returns a promise of Buffer (with the content of the file).
        - `Promise<Buffer>`
    - `writeFile` returns a promise with no arguments.
        - `Promise<undefined>`

### Chaining Promises
- Promises can be chained as the methods then/catch return a Promise.
- **Example 1**:
    - Objective: read the first line of a local file and write this line in a new file.
    - Available at: [examples/fs-promise/fs-promise-chaining.mjs](examples/fs-promise/fs-promise-chaining.mjs)

- **Example 2**:
    - Objective: read a JSON file and extract the object.
    - Available at: [examples/fs-promise/fs-read-json.mjs](examples/fs-promise/fs-read-json.mjs)



## 2. Fetch
- The **Fetch standard** defines requests, responses, and the process that binds them: fetching.
    - Specification at: https://fetch.spec.whatwg.org/
    - WHATWG: Web Hypertext Application Technology Working Group
- Also defines the **fetch JavaScript API**.
    - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

### Fetch API
- Provides an interface for fetching resources (*e.g.*, web page).
- In some platforms `fetch()` is a global method.
    - Such as Nodejs (since version 18) and browsers.
- Syntax:
    ```javascript
    fetch(input[, init])
    ```
    - input: a mandatory argument, the path to the resource to be fetched.
        - A string, a `Request` object or an object that produce a string.
    - init (optional): an object containing options to configure the request.
    - Return: a Promise to a `Response` object.
        - `Promise<Response>`

### Response Object

- An object that represents the response to a request.
- Some properties:
    - `status`: the status code of the response (200 for success).
    - `headers`: the headers associated to the response.
    - `body`: the body content.
- Some methods:
    - `text()`: returns a promise that resolves with a text representation of the response body.
        - `Promise<String>`
    - `json()`: returns a promise that resolves with the result of parsing the response body text as JSON.
        - `Promise<Object>`

### Example 1: An HTTP Request

- Objective: get the length of a response from an HTTP request.
    - From a free API.
- Available at: [examples/fetch-examples/fetch-sample.mjs](examples/fetch-examples/fetch-sample.mjs)
- Both following codes are equivalent:
    1. Each then() return, *i.e*., a promise, is assigned to a constant individually.
        ```javascript
        const responseP = fetch(URL_CHUCK_NORRIS_JOKE);
        const textP = responseP.then(resp => resp.text());
        const textP2 = textP.then(text => {console.log(text); return text});
        const lenP = textP2.then(text => text.length);
        const p = lenP.then(len => console.log(len));
        p.catch((err) => {console.log("Error")});
        ```
    2. Each then() is chained (most common way).

        ```javascript
        fetch(URL_CHUCK_NORRIS_JOKE)
            .then(resp => resp.text())
            .then(text => {console.log(text); return text})
            .then(text => text.length)
            .then(len => console.log(len))
            .catch((err) => console.log("Error"));
        ```

### Example 2: Another HTTP Request

- Objective: get the joke question and present the answer after ~3s.
    - From the free API: https://official-joke-api.appspot.com/random_joke
- Available at: [examples/fetch-examples/fetch-sample2.mjs](examples/fetch-examples/fetch-sample2.mjs)

### Example 3: Multiple HTTP Requests
- Objective: make two HTTP requests and get the sum of the length of each response.
- Available at: [examples/fetch-examples/http-requests.mjs](examples/fetch-examples/http-requests.mjs)


---

## Promise Concurrency

- See the [Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#promise_concurrency).

### Promise all

- Fulfills when **all** of the promises fulfill; 
    - Rejects when **any** of the promises rejects.
- **Input**: an iterable of promises (*e.g.*, Array).
- **Return**: a single Promise with an array of the fulfillment values.
    - In case of rejection, returns the first rejection reason.
- Usage:
    ```javascript
    const promiseArrayValues = Promise.all(iterable);
    ```
- An implementation of Promise **all** using then/catch:
    ```javascript
    function promiseAll(arrayPromises){
        const arrayValues = [];
        let count = 0;
        let rejected = false;
        return new Promise((resolve, reject) => {
            for (let p of arrayPromises){
                p.then(value => {
                    arrayValues.push(value);
                    count++;
                    if (count == arrayPromises.length)
                        resolve(arrayValues);
                }).catch(err => {
                    if (! rejected){
                        reject(err);
                        rejected = true;
                    }
                });

            }
        });
    }
    ```
- Example:
    - Objective: make multiple HTTP requests and get the sum of the length of each response. 
    - available at: [examples/fetch-examples/promise-all.js](examples/fetch-examples/promise-all.js).

### Promise any

- Fulfills when **any** of the promises fulfills;
    - Rejects when **all** of the promises reject.
- **Input**: an iterable of promises (*e.g.*, Array).
- **Return**: a single Promise with the first fulfillment value.
    - In case of rejection, returns an *AggregateError* containing an array of rejection reasons.
- Usage:
    ```javascript
    const promiseFirstValue = Promise.any(iterable);
    ```
- An implementation of Promise **any** using then/catch:
    ```javascript
    function promiseAny(arrayPromises){
        let count = 0;
        let rejectArray = [];
        return new Promise((resolve, reject) => {
            for (let p of arrayPromises){
                p.then(value => resolve(value))
                .catch(err => {
                    count++;
                    rejectArray.push(err);
                    if (count == arrayPromises.length){
                        reject(rejectArray);
                    }
                });

            }
        });
    }
    ```
- Example:
    - Objective: make multiple HTTP requests and get the length of the first response. 
    - available at: [examples/fetch-examples/promise-any-race.js](examples/fetch-examples/promise--any-race.js).

### Promise race

- Fulfills when **any** of the promises fulfills; 
    - Rejects when **any** of the promises rejects.
- **Input**: an iterable of promises (*e.g.*, Array).
- **Return**: a single Promise with the first fulfillment value or an error, what happens first.
- Usage:
    ```javascript
    const promiseFirst = Promise.race(iterable);
    ```
- An implementation of Promise **race** using then/catch:
    ```javascript
    function promiseRace(arrayPromises){
        return new Promise((resolve, reject) => {
            for (let p of arrayPromises){
                p.then(p => resolve(p))
                .catch(err => reject(err));
            }
        });
    }
    ```
- Example:
    - Objective: make multiple HTTP requests and get the first event: in the case of a success, get the length of the response; in the case of a failure, an error. 
    - available at: [examples/fetch-examples/promise-race.js](examples/fetch-examples/promise-race.js).

## Async and Await

- ECMAScript 2017 introduced the JavaScript keywords `async` and `await`.
- Async and await allow a new model to handle promises.
    - The code is asynchronous but structure appears to be synchronous.
    - Tends to make promises easier to write.

### Async Function

- The keyword `async` before a function makes the function be asynchronous and return a Promise.
- Syntax:
    ```javascript
    async function name(parameters) {
        statements
    }
    ```
- Example:
    ```js
    async function foo(x) {
        return x;
    }
    
    const p = foo(2);
    console.log(p);
    // → Promise { 2 }
    p.then(v => console.log(v));
    // → 2
    ```
- Equivalent usage without async:
    ```js
    function foo(x) {
        return new Promise(resolve => { 
                resolve(x);
            });
        // The same, with the method resolve:
        //return Promise.resolve(x); 
    }

    const p = foo(2);
    console.log(p);
    // → Promise { 2 }
    p.then(v => console.log(v));
    // → 2
    ```

### Await

- The await keyword is used to wait for a Promise and get its fulfillment value.
- It can only be used inside an `async` function or at the top level of a module.
- Example:
    ```js
    function resolveAfter3Seconds(x) {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(x), 3000);
        });
    }

    async function f1() {
        const x = await resolveAfter3Seconds(5);
        console.log("Value of x is:", x);
    }

    console.log("BEGIN");
    f1();
    console.log("END");
    // → BEGIN
    // → END
    // → Value of x is: 5
    ```
- Equivalent example with method `then`:
    ```js
    function resolveAfter3Seconds(x) {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(x), 3000);
        });
    }

    console.log("BEGIN");
    resolveAfter3Seconds(10)
        .then(x => console.log("Value of x is:", x));
    console.log("END");
    ```

### Handling Rejected Promises: Try-catch
- `await` is usually used to unwrap promises by passing a Promise as the expression.
    - When promise resolve successfully, the await expression returns the fulfilled value.
    - If the promise is rejected, the await expression **throws the rejected value**.
- **Try-catch** structure can be used to surround the await expression:
    ```js
    function resolveAfterNSeconds(x, time) {
        return new Promise((resolve, reject) => {
            if (typeof time !== 'number')
                reject("time is not a Number!");
            else
                setTimeout(() => resolve(x), time*1000);
        });
    }

    async function f1() {
        try {
            const x = await resolveAfterNSeconds(5, "Three");
            console.log("Value of x is:", x);
        }
        catch (e) {
            console.log(e);
        }
    }

    console.log("BEGIN");
    f1();
    console.log("END");
    // → BEGIN
    // → END
    // → time is not a Number!    
    ```

### Examples with async/await:
1. Examples with `setTimeout` as async function (and their equivalences with then method):
    - Available at: [examples/async-await/sample-settimeout.js](examples/async-await/sample-settimeout.mjs)

2. Example with `fetch` as async function:
    - Objective: get the joke question and present the answer after ~3s.
    - Available at: [examples/async-await/fetch-sample2.js](examples/async-await/fetch-sample2.mjs)

3. Another example with `fetch` as async function:
    - Objective: make two HTTP requests and get the sum of the length of each response.
    - Available at: [examples/async-await/http-requests.js](examples/async-await/http-requests.mjs)

---
## Exercises

1. Implement an application that fetches an URL and counts the occurrence of a given word in the content response.

2. Implement the async/await version for the example available at: [examples/fs-promise/fs-promise-chaining.mjs](examples/fs-promise/fs-promise-chaining.mjs). The goal is to read a text file and writing the first line in another file.

3. Implement two versions of an application that fetches more than one URL and counts the occurrence of a given word in the content response of each one.
    1. Using Promises explicitly
    2. Using the async/await style

4. Implement two versions of an application to read a JSON file (available at: [examples/fs-promise/fruits.json](examples/fs-promise/fruits.jsons)) and write in another file an object with a single property named "links". The value is an array with the links of the image fruits from the original object.
    1. Using Promises explicitly
    2. Using the async/await style