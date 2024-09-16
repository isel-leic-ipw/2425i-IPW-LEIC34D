// Primitive types and operators
let x = BigInt(123);
let a = 10000000000000000 + 1;
let y = 123;
let z = 123n;
console.log("1:", x, y, z, a);
console.log("2:", typeof x, typeof y, typeof z , typeof a);
console.log("3:", x == y, x == z, x === y, x === z);

// Scope
console.log("4:", h);
//console.log("4.1:", g);
{ 
    var h = 5;
    let g = "g";
}
console.log("5:", h);
//console.log("5.1:", g);

// Function and scope
console.log("6:", test());
console.log("7:", typeof test);
//console.log("7.1:", k);

function test(){
    var k = 4;
    console.log("8: test with k =", k);
}

// Arrow function
const sum = (x, y) => x + y;
console.log("9:", sum(2, 4));

// Closure
function setCounter() {
    let c = 0;
    return function () {
        c += 1; return c;
    }
}

const counter = setCounter();
console.log(typeof counter);
console.log("Ex. closure:", counter());
console.log("Ex. closure:", counter());
console.log("Ex. closure:", counter());

// Closure: another example
let counter2;
{
    let c = 0; // closure
    counter2 = function (){
        c++;
        return(c);
    }
}

console.log("Ex. closure:", counter2());
console.log("Ex. closure:", counter2());
console.log("Ex. closure:", counter2());

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