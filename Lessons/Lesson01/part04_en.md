# Data Structures: Objects and Arrays

## Objects
- **Definition**: An object is a collection of related data (attribute) and/or functionality (method).
- In JavaScript, most things are objects.
    - Objects can be seen as a collection of **properties**.
    - Properties specify attributes and methods.
    

## Properties
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
### Property Name:
- All properties have a name.
- Property names are **string**.

### Accessing properties:
- With dot: `value.property`
- With brackets (name is a string): `value['property']`

## Methods
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

## Defining Objects
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
    const point2D = {x: 3.2, y: 5.9};
    console.log(typeof point2D);
    // → object
    console.log(point2D);
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
    const point2D = {x: 3.2, y: 5.9};
    console.log(point2D['x']); // or point2D.x
    // → 3.2
    console.log(point2D.y); // or point2D['y']
    // → 5.9
    ```
### Object Loop
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
    const point2D = {x: 3.2, y: 5.9};
    point2D.x = 3.4;
    console.log(point2D.x);
    // → 3.4
    ```
- Adding a property:
    ```js
    const point2D = {x: 3.2, y: 5.9};
    point2D.color = "green";
    console.log(point2D);
    // → { x: 3.2, y: 5.9, color: 'green' }
    ```
- Removing a property:
    ```js
    const point2D = {x: 3.2, y: 5.9, color: 'green'};
    delete point2D.color;
    console.log(point2D);
    // → { x: 3.2, y: 5.9 }
    ```
- `in` operator:
    ```js
    const point2D = {x: 3.2, y: 5.9, color: 'green'};
    console.log('color' in point2D);
    // → true
    ```

## Arrays
- **Definition**: it is an **object** specifically used for storing sequences of values.
- **Declaration**: list of values between square brackets separated by commas.
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

## Strings and their properties
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

## Optional property access
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


## Json
- JSON: JavaScript object notation.
- Json serializes an object.
    ```js
    const person = {
        name: "Ana",
        surnames: ["Silva", "Nunes"]
    }
    
    ```
- In the example, surnames may not be in the same memory address space of person.
    - They are distinct objects probably allocated in not serial memory space.
- Methods for serialize and *unserialize*:
