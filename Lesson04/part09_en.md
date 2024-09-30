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
        - https://nodejs.org/api/fs.html#filehandlereadfileoptions
    - `writeFile`: asynchronously writes data to a file, replacing the file if it already exists.
        - https://nodejs.org/api/fs.html#filehandlewritefiledata-options

### Simple Usage: Example
- Objective of the example:
    - Read the content of a local file and print it.
- Available at: [examples/fs-promise/fs-sample.mjs](examples/fs-promise/fs-sample.mjs)
- Remarks:
    - readFile returns a promise of Buffer (with the content of the file).
        - `Promise<Buffer>`
    - writeFile returns a promise with no arguments.
        - `Promise<undefined>`

### Chaining Promises: Example 1
- Objective of this example:
    - Read the first line of a local file and write this line in a new file.
- Available at: [examples/fs-promise/fs-promise-chaining.mjs](examples/fs-promise/fs-promise-chaining.mjs)

### Chaining Promises: Example 2
- Objective of this example:
    - Read a JSON file and extract the object.
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
- Objective: make two HTTP requests and get sum of the length of each response.
- Available at: [examples/fetch-examples/http-requests.mjs](examples/fetch-examples/http-requests.mjs)


---

## Async and Await

## Promise all