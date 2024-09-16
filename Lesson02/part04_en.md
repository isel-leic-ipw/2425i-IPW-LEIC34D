# Data Structures: Objects and Arrays

## Objects Definition
- **Definition**: An object is a collection of related data (attribute) and/or functionality (method).
- In JavaScript, most things are objects.
    - Objects can be seen as a collection of **properties**.
    - Properties specify attributes and methods.
    

### Properties
- **Definition**: a feature of a primitive value or object.
- Almost all JavaScript values have properties.
    - Exception for `null` and `undefined`.
- Example with `length` attribute property for a string:

    ```js
    let name = "Maria";
    console.log(name.length);
    // → 5
    console.log(name['length']); // The same
    // → 5
    ```
### Property Name
- All properties have a name.
- Property names are **string**.

### Accessing properties
- With dot: `value.property`
- With brackets (name is a string between `'` or `"`): `value['property']`

### Methods
- **Definition**: describe the functionality of a primitive value or object.
- In JavaScript, a method is a function assigned to a property.
    - Since a function is a value.
- Example: method `toUpperCase` of a string.
    ```js
    let isel = "isel";
    console.log(typeof isel.toUpperCase);
    // → function
    console.log(isel.toUpperCase());
    // → ISEL
    console.log(isel['toUpperCase']()); // The same, but not usual
    // → ISEL
    ```

## Object Literals

- Values of the type **object** are arbitrary collections of properties.
- A property is defined as: `name : value`
    - A name is a string.
    - A value can be any value:
        - Primitive type.
        - Object type.
        - Function: is an object that can be *called*.
- An object is a list of properties (separated by comma) wrapped by braces.
    ```javascript
    anObject = {
        name1 : value1,
        name2 : value2,
        ...,
        nameN : valueN
    }
    ```
- Example:
    ```js
    const point1 = {x: 3.2, y: 5.9};
    console.log(typeof point1);
    // → object
    console.log(point1);
    // → { x: 3.2, y: 5.9 }
    ```
- More different example:
    - The property name is converted to string.
    ```js
    const anObjectExample = {
        one: 1,
        two : 2,
        10: 10,
        "twenty one": 21
    };
    console.log(anObjectExample);
    // → { '10': 10, one: 1, two: 2, 'twenty one': 21 }
    ```

### Accessing the Value
- As each element is a property, the access is:
    ```js
    const point1 = {x: 3.2, y: 5.9};
    console.log(point1['x']); // or point1.x
    // → 3.2
    console.log(point1.y); // or point1['y']
    // → 5.9
    ```

### Defining Methods in Object Literals

- Just assign a function as a property of an object.
    ```js
    function formatCoordFunction(){
        return "(" + this.x + ", " + this.y + ")";
    }
    const point1 = {
        x: 3.2, 
        y: 5.9, 
        formatCoord: formatCoordFunction
    };
    console.log(point1.formatCoord());
    // → (3.2, 5.9)
    ```
- Or assign an anonymous function directly in the object.
    ```js
    const point1 = {
        x: 3.2, 
        y: 5.9,
        formatCoord: function (){
            return "(" + this.x + ", " + this.y + ")";
        }
    };
    console.log(point1.formatCoord());
    // → (3.2, 5.9)
    ```

- Or declare the function directly in the object (without `function` keyword).
    ```js
    const point1 = {
        x: 3.2, 
        y: 5.9,
        formaCoord(){
            return this.x + ", " + this.y + ")";
        }
    };
    console.log(point1.formatCoord());
    // → (3.2, 5.9)
    ```
- Note: in these cases, the keyword `this` refers to the object itself.


### Object Looping
- Using `for-in`:
    ```js
    const person1 = {name: 'Pedro', surname: 'Silva', age: 25};
    for (let prop in person1){
        console.log(prop, person1[prop]);
    }
    // → name Pedro
    //   surname Silva
    //   age 25
    ```

### Mutability
- Values of primitive type are immutable.
    - It is impossible to change values of those types.
    - Do not confuse immutability with the constants (`const`).
    - Example: `let animal = 'cat'`
        - You can create a new string `'rat'` and assign it to the variable `animal`;
        - But the first letter of `'cat'` can't be changed.
- Values of object type are mutable.
- Changing a value:
    ```js
    const point1 = {x: 3.2, y: 5.9};
    point1.x = 3.4;
    console.log(point1.x);
    // → 3.4
    ```
- Adding a property:
    ```js
    const point1 = {x: 3.2, y: 5.9};
    point1.color = "green";
    console.log(point1);
    // → { x: 3.2, y: 5.9, color: 'green' }
    ```
- Removing a property:
    ```js
    const point1 = {x: 3.2, y: 5.9, color: 'green'};
    delete point1.color;
    console.log(point1);
    // → { x: 3.2, y: 5.9 }
    ```
    
### The in Operator
- Indicates whether a property belongs to an object.
    ```js
    const point1 = {x: 3.2, y: 5.9, color: 'green'};
    console.log('color' in point1);
    // → true
    ```

## Constructor Function

- **Definition**: used to create/construct objects of the same type.
- All function has a constructor function.
- The `new` operator creates a new object through a **constructor function**.

### Creating an Object with Constructor Functions

1. Define the object type by writing a **constructor function**.
    - By convention, use a capital initial letter. 
2. Create an instance of the object with `new` operator.

    ```js
    function Point2D(x, y) {
        this.x = x;
        this.y = y;
        this.toString = function (){
            return("(" + this.x + ", " + this.y + ")");
        }
    }
    let point1 = new Point2D(3.2, 4.9);
    console.log(point1.toString());
    // → (3.2, 4.9)
    ```

### This
- The value of `this` depends on how the function is invoked.
    - As a method of an object: `this` points to that object.
    - Standalone: `this` points to the global object (`globalThis`) or `undefined` (in *strict mode*).
- In a **constructor function**, `this` represents the  object instantiated with `new`.
    - In the previous example, `point1`.

### Built-in Constructor Functions

- There are several built-in constructor functions in JavaScript:
    - Object
    - String
    - Array
    - [... (see the documentation)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)
- Examples:
    ```js
    let o = new Object();
    let s = new String();
    let a = new Array();
    console.log(o, s, a);
    //  → {} [String: ''] []
    ```
- All of them has a common constructor function: `Function`.
    - Accessible by the built-in property `constructor`.
    ```javascript
    console.log(Object.constructor);
    //  → [Function: Function]
    ```

### Prototype
- Every constructor function (built-in or not) has a built-in property called **prototype**.
- Every object created with a constructor function contains its prototype.
- A prototype is the base of an object.
- Prototypes allow us to add new properties to a constructor function.
```js
function Point2D(x, y){
    this.x = x;
    this.y = y;
}

let point4 = new Point2D(3.4, 5.6);
let point5 = new Point2D(8.2, 3.0);
console.log(point4);
console.log(point5);
// → Point2D { x: 3.4, y: 5.6 }
// → Point2D { x: 8.2, y: 3 }

// Adding new properties:
Point2D.prototype.color = undefined;
Point2D.prototype.setColor = function (color){
    this.color = color;
}
point4.setColor("green");
point5.setColor("red");
console.log(point4);
console.log(point5);
// → Point2D { x: 3.4, y: 5.6, color: 'green' }
// → Point2D { x: 8.2, y: 3, color: 'red' }
```
- Notes:
    - The constructor function is Point2D (not a built-in);
    - We are accessing the property prototype from Point2D;
    - All objects created subsequent to adding the new property to the prototype, have color and setColor properties.

## Arrays
- **Definition**: it is an **object** specifically used for storing sequences of values.
- **Declaration**: a list of values between square brackets separated by commas.
    ```js
    const anArray = [1, 2, 3];
    console.log(typeof anArray);
    // → object
    console.log(anArray);
    // → [ 1, 2, 3 ]
    console.log(`Another way to print an array: ${anArray}`);
    // → Another way to print an array: 1,2,3
    ```
- Accessing a value:
    - Property name is a number index inside square brackets.
    - It can be also a numeric expression.
    - The index starts in `0`.
    ```js
    const anArray = [true, 'Maria', 3];
    console.log(anArray[0]);
    // → true
    console.log(anArray[1]);
    // → Maria
    console.log(anArray[anArray.length - 1]);
    // → 3
    ```
- Values of an array can be anything:
    ```js
    const arr = [{one: 1, two: 2}, 
                 ["Maria", "Pedro"], 
                 (x) => x * x
                ];
    console.log(arr[0]);
    // → { one: 1, two: 2 }
    console.log(arr[1]);
    // → [ 'Maria', 'Pedro' ]
    console.log(arr[2](7)); // calling the arrow function
    // → 49
    ```

### Arrays Loops
- Using `for`:
    ```js
    const arr = ['Ana', 'Pedro', 'José'];
    for (let i = 0; i < arr.length; i++){
        console.log(arr[i]);
    }
    ```
- Using `for-in`:
    ```js
    const arr = ['Ana', 'Pedro', 'José'];
    for (let i in arr){
        console.log(arr[i]);
    }
    ```
- Using `for-of`:
    - Valid only for iterable objects, as arrays or string.
    ```js
    const arr = ['Ana', 'Pedro', 'José'];
    for (let elem of arr){
        console.log(elem);
    }
    ```

### Arrays Methods
- `push` and `pop`: add and remove values to/from the end of the array.
    ```js
    const sequence = [1, 2, 3];
    sequence.push(4);
    sequence.push(5);
    console.log(sequence);
    // → [1, 2, 3, 4, 5]
    console.log(sequence.pop());
    // → 5
    console.log(sequence);
    // → [1, 2, 3, 4]
   ```
- `shift` and `unshift`: add and remove values to/from the start of the array.
    ```js
    let todoList = [];
    function remember(task) {
        todoList.push(task);
    }
    function getTask() {
        return todoList.shift();
    }
    function rememberUrgently(task) {
        todoList.unshift(task);
    }
    ```
- `indexOf` and `lastIndexOf`: return the first/last index at which the requested value was found — or -1 if it wasn’t found. 
    ```js
    const arr = [1, 2, 3, 2, 1];
    console.log(arr.indexOf(2));
    // → 1
    console.log(arr.lastIndexOf(2));
    // → 3
    console.log(arr.indexOf(7));
    // → -1
    ```
- `slice`: return an array between the start and end of an array.
    ```js
    console.log([0, 1, 2, 3, 4].slice(2, 4));
    // → [ 2, 3 ]
    console.log([0, 1, 2, 3, 4].slice(2));
    // → [ 2, 3, 4 ]
    ```

## General Object Methods
- Some available methods:
    - `Object.assign(target, source)`: Copies properties from a source object to a target object.
        ```js
        let objectA = {a: 1, b: 2};
        Object.assign(objectA, {b: 3, c: 4, d: 10});
        console.log(objectA);
        // → { a: 1, b: 3, c: 4, d: 10 }
        ```
    - `Object.entries(object)`: Returns an array of the key/value pairs of an object.
        ```js
        console.log(Object.entries({x: 0, y: 0, z: 2}));
        // → [ [ 'x', 0 ], [ 'y', 0 ], [ 'z', 2 ] ]
        ```
    - `Object.fromEntries(array)`: Creates an object from a list of keys/values.
        ```js
        console.log(Object.fromEntries([['x', 3], ['y', 6]]));
        // → { x: 3, y: 6 }
        ```
    - `Object.keys(object)`: Returns an array of the keys of an object.
        ```js
        console.log(Object.keys({x: 0, y: 0, z: 2}));
        // → [ 'x', 'y', 'z' ]
        ```

    - `Object.values(object)`: Returns an array of the property values of an object.
        ```js
        console.log(Object.values({x: 0, y: 0, z: 2}));
        // → [ 'x', 'y', 'z' ]
        ```

### Methods Call and Apply

- Methods `call` and `apply` can be used to assign explicitly the object to `this` value.
    ```js
    let obj = {x: 7, y: 0.4};
    console.log(formatString.call(obj));
    // → (7, 0.4)
    console.log(formatString.apply(obj));
    // → (7, 0.4)

    function formatString(){
        return "(" + this.x + ", " + this.y + ")";
    }
    ```
- Call *vs.* Apply

    ```js
    let obj = {x: 7, y: 4};
    console.log(add.call(obj, 3, 6));
    // → 20
    console.log(add.apply(obj, [3, 6]));
    // → 20

    function add(x, y){
        return (this.x + x) + (this.y + y);
    }
    ```
    - In method `apply`, the function parameters need to be passed between `[` and `]` (an array).


## Strings and Their Properties
- Strings have properties as `length` and `toUpperCase`.
    - But they are **immutable**, so we can't add properties:
    ```js
    let maria = "Maria";
    maria.age = 30;
    console.log(maria.age);
    // → undefined
    ```
- Accessing string character (as array):
    ```js
    console.log("coconuts"[4]);
    // → n
    ```
- Strings have some properties (methods) similar to array:
    ```js
    console.log("coconuts".slice(4, 7));
    // → nut
    console.log("coconuts".indexOf("u"));
    // → 5
    console.log("one two three".indexOf("ee"));
    // → 11
    ```
- Other useful methods: 
    - `trim`: removes whitespace (spaces, newlines, tabs, and similar characters) from the string.
        ```js
        console.log("  hello \n ".trim());
        // → hello
        ```
    - `padStart`: takes the desired length and padding character as arguments.
        ```js
        console.log('7'.padStart(3, "0"));
        // → 007
        ```
    - `repeat`: creates a new string containing multiple copies of the original string together.
        ```js
        console.log('LA'.repeat(3));
        // → LALALA
        ```
    - `split`: creates an array with the parts of the original string separated by a given string.
     - `join`: creates a string from a string array concatenated by a given string. 
        ```js
        let sentence = "Have a nice day";
        let words = sentence.split(" ");
        console.log(words);
        // → [ 'Have', 'a', 'nice', 'day' ]
        console.log(words.join("... "));
        // →  Have... a... nice... day      
        ```
    - `substring`: returns the part of this string from the start index up to and excluding the end index, or to the end of the string if no end index is supplied.
        ```js
        const str = 'ISEL-LEIC';

        console.log(str.substring(0, 4));
        // → ISEL

        console.log(str.substring(5));
        // → LEIC
        ```
    - `concat`: concatenates the string arguments to this string and returns a new string.
    ```js
    const str1 = 'Hello';
    const str2 = 'World';

    console.log(str1.concat(' ', str2));
    // → Hello World
    console.log(str1.concat(", ", "my", " ", "friend"));
    // → Hello, my friend
    ```

## Rest Parameters
- Allow a function to accept an indefinite number of arguments as an array.

    ```js
    function sum(...theArgs) {
    let total = 0;
    for (const arg of theArgs) {
        total += arg;
    }
    return total;
    }

    console.log(sum(1, 2, 3));
    // → 6
    console.log(sum(1, 2, 3, 4));
    // → 10
    ```

## Optional Property Access
- Variant of dot notation: `object?.property`.
    - It has the same effect of dot notation but returns `undefined` when a property doesn't exist.
- Used when we aren't sure that a given property exists.
    ```js
    function city(object) {
        return object.address?.city;
    }

    console.log(city({address: {city: "Toronto"}}));
    // → Toronto
    console.log(city({name: "Vera"}));
    // → undefined
    ```
- Can be used in function calls:
    ```js
    console.log("string".notAMethod?.());
    // → undefined
    ```
- Can be used in the square brackets access:
    ```js
    const personA = {name: 'Ana'};
    console.log(personA.surnames?.[0]);
    // → undefined
    ```

## Destructuring

- Unpack values from an array or object.
- Example with array:
    ```js 
    let a, b, rest;
    [a, b] = [10, 20];

    console.log(a);
    // → 10
    console.log(b);
    // → 20
    [a, b, ...rest] = [10, 20, 30, 40, 50];
    console.log(rest);
    // → [ 30, 40, 50 ]
    ```
- Example with object:
    ```js
    const obj = { x: 3.8, y: 7.2 };
    const { x, y } = obj;
    console.log(x, y);
    // → 3.8 7.2
    ```

## Json
- JSON: JavaScript object notation.
- Json serializes an object.
    ```js
    const person = {
        name: "Ana",
        surnames: ["Silva", "Nunes"]
    }
    ```
- In the example, `surnames` may not be in the same memory address space of person.
    - They are distinct objects probably **not** allocated in serial space of memory.
- Methods for serialize and *unserialize*:
    ```js
    const person = {
        name: "Ana",
        surnames: ["Silva", "Nunes"]
    }
    personSerialized = JSON.stringify(person);
    console.log(personSerialized);
    // → {"name":"Ana","surnames":["Silva","Nunes"]}

    console.log(JSON.parse(personSerialized).surnames);
    // → [ 'Silva', 'Nunes' ]
    ```
---

## Exercises

- From the book Eloquent JavaScript: 
    - https://eloquentjavascript.net/04_data.html#h-TcUD2vzyMe
    - *The sum of a range*, *Reversing an array*, and *Deep comparison*. 

---