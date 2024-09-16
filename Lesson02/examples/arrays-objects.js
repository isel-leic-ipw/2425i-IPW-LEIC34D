// ----------------------------
// Some object notations
let o1 = {};
let o2 = new Object();
let s1 = "Hello";
let s2 = new String("Hello");

// ----------------------------
// Array
const arr = [1, 2, 6, 8, 10];
console.log("1:", typeof arr);

for (let i in arr){
    console.log("2. ", i, arr[i]);
}
for (let elem of arr){
    console.log("3. ", elem);
}

// ----------------------------
// Example of the use of apply/call methods
function add(a,b) {
    return a+b;
}
  
function times(a,b) {
    return a*b;
}
  
   
function showArguments(f) {
    return function (...args) {

        console.log(`   arguments: ${args}`);

        let ret = f.apply(this, args);

        //let ret = f.call(this, ...args); the same with call method
        console.log(`   return: ${ret}`);

        return ret;
    };
}
  
let saAdd = showArguments(add);
let saTimes = showArguments(times);
 
console.log("8.", saAdd(2, 3));
console.log("9.", saTimes(2, 3));

// ----------------------------
// Json
const person = {
    name: "Ana",
    surnames: ["Silva", "Nunes"],
    age: 20
}
personSerialized = JSON.stringify(person);
console.log("10.", personSerialized);
// Do something with personSerialized (e.g., store or send)

// Recover the object from a serialized JSON:
console.log("11.", JSON.parse(personSerialized).surnames);