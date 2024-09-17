'use strict'; // strict mode

////////////////////
// Object literal //
////////////////////
let obj = { x: 3, y: 2 };
console.log("1:", typeof obj);
console.log("2.", obj['x']); // or point1.x
console.log("3.", obj.y); // or point1['y']

for (let i in obj) {
    console.log("4.", i, obj[i]);
}


// Way 1: Defining Methods for an object literal.
function formatCoordFunction() {
    return ("(" + this.x + ", " + this.y + ")");
}

const point1 = {
    x: 0.1,
    y: 2.8,
    formatCoord: formatCoordFunction
};
console.log("5:", point1.formatCoord());

// Using the method call in object obj:
console.log("6:", formatCoordFunction.call(obj));

// In strict mode, calling formatCoordFunction raises Error
//console.log("3.1:", formatCoordFunction()); // Error

// Way 2: Defining Methods for an object literal.
const point2 = {
    x: 3.2,
    y: 5.9,
    formatCoord: function () {
        return ("(" + this.x + ", " + this.y + ")");
    }
};
console.log("7:", point2.formatCoord());

// Way 3: Defining Methods for an object literal.
const point3 = {
    x: 5.2,
    y: 6.4,
    formatCoord() {
        return "(" + this.x + ", " + this.y + ")";
    }
};
console.log("8:", point3.formatCoord());


////////////////////////////////////////
// Constructor function and Prototype //
////////////////////////////////////////

function Point2D(x, y) {
    this.x = x;
    this.y = y;
    this.formatCoord = formatCoordFunction;
}

let point4 = new Point2D(3.4, 5.6);
let point5 = new Point2D(8.2, 3.0);
console.log("9:", point4);
console.log("10:", point5);

// Examples of Function Constructors:
console.log("FC 1:", Object); // the Object constructor
console.log("FC 2:", Function); // the Function constructor
console.log("FC 3:", Array); // the Array constructor
console.log("FC 4:", String); // the String constructor
console.log("FC 5:", Point2D); // My function constructor

// Show the constructors of a constructor function
console.log("Constructor 1:", Object.constructor);
console.log("Constructor 2:", String.constructor);
console.log("Constructor 3:", Point2D.constructor);
console.log("Constructor 4:", formatCoordFunction.constructor);
console.log("Constructor 5:", point4.constructor); // my object
console.log("Constructor 6:", point4.constructor.constructor);

// Prototype: if we need to add a new property...
Point2D.prototype.color = "black";
Point2D.prototype.setColor = function (color) {
    this.color = color;
}

point4.setColor("green");
console.log("11:", point4);
console.log("12:", point5, point5.color); // Search property in the prototype

// -----------------------------
// Prototype: example with built-in constructor function String: add a new enclose method.
let s1 = new String("ISEL");

console.log("13.", s1.enclose); // Not exists!
console.log("14.", s1.constructor);

// Adding a new method for a String:
String.prototype.enclose = function () {
    return `*** ${this} ***`
}

let s2 = "LEIC";

console.log("15.", s1.enclose);

console.log("16.", s2.enclose());
console.log("17.", s1.enclose());

// -----------------------------
// Prototype: example with built-in constructor function String: modify substring method.

console.log("18.", s1.substring(2, 4));

// Modifying an existing method for bad:
String.prototype.substring = function (b, e) {
    return "Busted!!!!";
};

console.log("19.", s1.substring(2, 4));

// Modifying an existing method for good:
console.log("20.", "Hello,".concat("LEIC ", "and ", "ISEL"));

//Using a global variable to store the old implementation
const oldConcat = String.prototype.concat; // Not recommended
String.prototype.concat = function (...args) {
    const PREFIX = " #1# ";
    let newArgs = [];
    console.log("--->", args);
    for (let arg of args) newArgs.push(PREFIX + arg);
    //let newArgs = args.map(s => PREFIX + s);
    return oldConcat.apply(PREFIX + this, newArgs);
}

/*
//Storing the old implementation in String prototype instead of in a global variable
String.prototype.oldConcat = String.prototype.concat; // Not recommended
String.prototype.concat = function (...args) {
    const PREFIX = " #2# ";
    let newArgs = [];
    for (let arg of args) newArgs.push(PREFIX + arg);
    //let newArgs = args.map(s => PREFIX + s);
    return (PREFIX + this).oldConcat(newArgs);
}
*/

/*
// Creating a new scope (block) to create a new closure
{
    // Using a local variable to store the old implementation
    let oldConcat = String.prototype.concat;
    String.prototype.concat = function (...args) {
        const PREFIX = " #3# ";
        let newArgs = [];
        for (let arg of args) newArgs.push(PREFIX + arg);
        //let newArgs = args.map(s => PREFIX + s);
        return oldConcat.apply(PREFIX + this, newArgs);
    };
}
*/

console.log("21.", "Hello,".concat("LEIC ", "and ", "ISEL"));
