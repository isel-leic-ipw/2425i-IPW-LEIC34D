// Primitive types and operators
let x = BigInt(123);
let a = 10000000000000000 + 1;
let y = 123;
let z = 123n;
console.log("1:", x, y, z, a);
console.log("2:", typeof(x), typeof(y), typeof(z), typeof(a));
console.log("3:", x == y, x == z, x === y, x === z);

// Object
let obj = {x: 3, y: 2};
console.log("4:", typeof obj);

// Scope
console.log("5:", h);
//console.log("5.1:", g);
{ 
    var h = 5;
    let g = "g";
}
console.log("6:", h);
//console.log("6.1:", g);

// Function and scope
console.log("7:", test());
console.log("8:", typeof test);
//console.log("8.1:", k);

function test(){
    var k = 4;
    console.log("9: test with k =", k);
}

// Arrow function
sum = (x, y) => x + y;
console.log("10:", sum(2, 4));

// Array
const arr = [1, 2]
console.log("11:", typeof arr);

// Json
console.log("12:", JSON.stringify({a: 2, b: [1, 2]}));

// Closure
function setCounter() {
    let counter = 0;
    return function () {
        counter += 1; return counter;
    }
}

const counter = setCounter();
console.log(counter());
console.log(counter());
console.log(counter());

/*
// Stack call:
function chicken() {
    return egg();
}
function egg() {
    return chicken();
}
console.log(chicken() + " came first.");
*/