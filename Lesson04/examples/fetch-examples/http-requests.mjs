const URL = "https://api.chucknorris.io/jokes/mdtKGns-QgSMtKPCSRnrNA";
const URL1 = "https://api.chucknorris.io/jokes/mdtKGns-QgSMtKPCSRnrNA";
//const URL1 = "https://eloquentjavascript.net/11_async.html"

function processResponse(text) {
    console.log(text.length);

}

const p1 = fetch(URL);   // Promise<Response>
const p2 = fetch(URL1);  // Promise<Response>

// First way: everything in the promise chain.
// p1                                               // Promise<Response>
//     .then(rsp => rsp.text())                     // Promise<String>
//     .then(text => text.length)                   // Promise<Number>
//     .then(len => {                               // Promise<Number>
//         return p2
//             .then(rsp => rsp.text() )            // Promise<String>
//             .then(text => text.length)           // Promise<Number>
//             .then(len1 => len+len1);             // Promise<Number>
//     })
//     .then(total => console.log(total))

// This function returns a promise of Number (the length).
function promiseResponseToNumber(p1) {
    return p1                                   // Promise<Response>
        .then(rsp => rsp.text() )               // Promise<String>
        .then(text => text.length);             // Promise<Number>
}

// Second way: wrap the functionality of getting the length
// from a response and then sum both lengths.
// promiseResponseToNumber(p1)                  // Promise<Number>
//     .then(
//         len => promiseResponseToNumber(p2)   // Promise<Number>
//                 .then(len1 => len+len1)      // Promise<Number>
//         )
//     .then(total => console.log(total));


// Third way: use a function to combine the numbers (more generic way).
function combineTwoPromiseNumbers(p1, p2, combiner) {
    return promiseResponseToNumber(p1)              // Promise<Number>
        .then(
            len => promiseResponseToNumber(p2)      // Promise<Number>
                .then(len1 => combiner(len, len1))  // Promise<Number>
        )
        .catch(e => console.log(e));
}

combineTwoPromiseNumbers(p1, p2, (a, b) => a + b)
    .then(len => console.log(len));
