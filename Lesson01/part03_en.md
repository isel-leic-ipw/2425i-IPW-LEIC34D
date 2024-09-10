# Functions
- To work with functions, we need two steps:
    - **Definition**: define what the function does.
    - **Calling**: execute the function in the code.

## Defining a Function
- In Javascript, a function can be defined as:
    - **Declaration notation**
    - **Function as a value** or function expressing
    - **Arrow function**
---

## Calling a Function
- Functions are used calling:
    - by the name;
    - values of the arguments can be defined;
        - if not, `undefined` is assigned.
- Example:
    ```javascript
    console.log("Hello");
    ```

---

## Declaration Notation
- Traditional way (like many other programming language).
- **Syntax**:
    ```javascript
    function functionName(arg1, arg2, ..., argN){
        // Statements or block
        return expression; // optional
    }
    ```
- If the statement `return` is not specified, the function returns `undefined`.
- Example:
    ```js
    console.log(square(7)); // calling the function
    // → 49

    // Declaration of the function square
    function square(n) {
        return n * n;
    }
    ```

---

## Scopes
- Each variable has a scope.
    - Variables can be used only inside their scope.
- **Global scope**: declared in the scope of the main program.
- **Local scope**: declared inside a **function** or **block**.
    ```javascript
    function test(n) { // local to function
        let a = 1; // also local to function
        return n - a;
    }

    let x = 10;   // global
    if (x > 0) {
        let y = 20; // local to block
    }
    ```

### Var Scope
- `var` has global and function scope.
- In a block, a variable declared with `var` has global scope.
- In a function, a variable declared with `var` has local-function scope.
    ```javascript
    function test() {
        var a = 1; // local to function
        return a;
    }

    var x = 10;   // global
    if (x > 0) {
        var z = 30; // also global
    }
    ```

### Let Scope
- `let` has block scope.
- In a block, a variable declared with `let` has local scope.
- In a function, a variable declared with `let` also has local scope.
- In the same scope, `let` can be reassigned but not re-declared:
    ```js
    let x = 10;
    //let x = 9; // Error (re-declaring)
    x = 9; // Reassigning is Ok
    if (x > 0) {
        let x = 30; // Ok: new x inside the block
        console.log(x); // Use x in the local scope
    }
    console.log(x); // Use x in the global scope
    // → 30
    // → 9
    ```

### Nested Scope
- Blocks and functions can be created inside each other.
- JavaScript allows you to declare functions inside functions (nested functions).
    ```js
    function addSquares(a, b) {
        function square(x) {
            return x * x;
        }
        return square(a) + square(b);
    }

    console.log(addSquares(2, 3)); 
    console.log(addSquares(3, 4));
    console.log(addSquares(4, 5));
    // → 13
    // → 25
    // → 41
    ```

---


## Functions as Values
- In JavaScript, functions are *first-class objects* (*i.e.* treated like any other variable).
    - Can be passed to other functions;
    - Returned from functions;
    - Assigned as a value to variables or constants.
- Example:
    ```js
    function square(x) {
        return x * x;
    };

    const mySquare = square;
    console.log(typeof mySquare);
    console.log(mySquare(7));
    // function
    // → 49
    ```

### Declaring Functions as Values
- Using **anonymous** function:
    ```javascript
    const functionName = function (arg1, arg2, ..., argN) {
        // Statements or block
        return expression; // optional
    };
    ```
- Example:
    ```js
    const square = function (x) {
        return x * x;
    };

    console.log(square(7));
    // → 49
    ```

---

## Arrow Functions
- A compact alternative.
- Use the operator `=>`.
- **Syntax**:
    ```javascript
    const functionName = (arg1, arg2, ..., argN) => {
        // Statements or block
        return expression; // optional
    };
    ```
- Example:
    ```js
        const square = (x) => { return x * x; };
        console.log(square(7));
        // → 49
    ```
- When there is only one argument, the parentheses can be omitted.
- If the statement is a single expression, then the braces and `return` word can be omitted.
    ```js
        const square = x => x * x;
        console.log(square(7));
        // → 49
    ```

---

## Call Stack
- Function callings changes the control flow of the program.
- A call to a function causes control to jump to the start of it.
    - In the end, the function returns and back to the point of calling.
- When the computer execute a function, the current context is stored in the **call stack**.
    - In the end of the function, computer removes the top of the call stack.
- Storing this stack requires space in the computer’s memory.
    - When memory runs out, the call stack "blows" (or stack overflow).
- Example:
    - (Throws the error "RangeError: Maximum call stack size exceeded".)

    ```js
    function chicken() {
        return egg();
    }
    function egg() {
        return chicken();
    }
    console.log(chicken() + " came first.");
    // → ??
    ```
---

## Recursion
- What if a function to call itself?
    - It's ok (and very useful!), as long as it doesn’t overflow the stack.
- Example:
```js
    function power(base, exponent) {
        if (exponent == 0) { // stop the recursion
            return 1;
        } else {
            return base * power(base, exponent - 1);
        }
    }

    console.log(power(2, 3));
    // → 8
```

---
## Closure
-  A function that references variables/bindings from local scopes around it is called a **closure**. 
- Example:

    ```js
    function setCounter() {
        let c = 0;
        return function () {
            c += 1; return c;
        }
    }

    const counter = setCounter();
    console.log(counter());
    console.log(counter());
    console.log(counter());
    ```
- Note:
    - The anonymous function inside the `setCounter` is returned by `setCounter`.
    - When `counter` function is assigned, variable `c` is locally defined in `setCounter`.

---

## Exercises

- From the book Eloquent JavaScript: 
    - https://eloquentjavascript.net/03_functions.html#h-TcUD2vzyMe

---