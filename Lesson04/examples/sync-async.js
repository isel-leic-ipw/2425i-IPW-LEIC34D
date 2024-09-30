console.log("BEGIN");

// The input is a number and output is a string:
// (Number) -> String
function longOperation(a) {
    // Assume that the following instructions execution time was spent in I/O
    for(i = 0; i < a; ++i);

    return (a+1).toString();
}

// (Number, Function) -> undefined
function longOperationAsyncWithCallback(a, cb) {
    // Asynchronous function with synchronous implementation
    //let res = longOperation(a);
    //cb(res);
    
    // Asynchronous function with asynchronous implementation
    setTimeout(() => cb(a.toString()), 3000);
    console.log("Callback was set...");
}

// (Number) -> Promise
function longOperationAsyncWithPromise(a) {
    return new Promise(function(resolve, reject) {
        if(!Number(a)) {
            reject("A must be a number");
        }
        setTimeout(() => resolve(a.toString()), 3000);
    });
}

// (Number) -> undefined
function processResult0(result) {
    console.log("processResult0");
}

// (Number) -> undefined
function processResult1(result) {
    console.log("processResult1", result);
    console.log(result);
}

// Main code
const VAL = 2000000000;

console.log("Asynchronous function with callback");
// Async model with callback
longOperationAsyncWithCallback(VAL+10, processResult1);


/* console.log("Asynchronous function with promise");

// Async model with Promise
longOperationAsyncWithPromise(VAL+20)   // Promise<Number>
    .then(processResult1);              // Promise<String>

// longOperationAsyncWithPromise("abc")
//     .then(processResult1)
//     .catch(processResult0);

// The same as above, but each call is separated.
// let p = longOperationAsyncWithPromise("abc");
// p.then(processResult1);
// p.catch(processResult0);

// Sync model
console.log("Synchronous function");
let res = longOperation(VAL);
processResult1(res); */

console.log("END");