
# JavaScript: Overview and Evolution

## Introduction to JavaScript
- Origin:
    - Introduced in 1995 for Netscape Navigator.
    - Created by Brendan Eich.
    - Enabled adding interactive programs to web pages.
- Adoption:
    - Adopted by all major web browsers.
    - Powers modern web applications with direct user interaction (no page reloads).
## JavaScript *vs.* Java
- Misleading Name:
    - JavaScript is unrelated to Java.
    - The name was a marketing tactic to capitalize on Java’s popularity at the time.
## Standardization: ECMAScript
- ECMAScript Standard established to ensure uniformity across different browsers.
- ECMAScript and JavaScript are interchangeable terms.
## JavaScript's Early Challenges
- Initial Reception:
    - Criticized for being overly permissive, leading to unpredictable behavior.
    - Designed to be beginner-friendly, but this flexibility often made debugging harder.
## Advantages of JavaScript's Flexibility
- Creative Freedom:
    - Allows techniques not possible in stricter languages.
    - Encourages an informal programming style.
## Versions of JavaScript
- ECMAScript 3 (2000-2010):
    - Dominated the early growth of JavaScript.
- Abandonment of Version 4:
    - Version 4’s ambitious changes were politically difficult and ultimately abandoned.
- ECMAScript 5 (2009):
    - Introduced modest improvements.
- ECMAScript 6 (2015):
    - A major update incorporating some ideas from the abandoned version 4.
- Annual Updates:
    - JavaScript continues to evolve with small updates each year.
## Compatibility and Updates
- Browser Compatibility:
    - Older browsers may not support newer features.
- Efforts are made to ensure backward compatibility, so older programs continue to run in new browsers.
## Beyond Web Browsers
- Non-Browser Platforms:
    - Used in databases (*e.g.*, MongoDB, CouchDB) for scripting and queries.
- Node.js:
    - JavaScript platform for server-side and desktop programming.

## IDE Example
- Visual Studio Code (VSCode)
    - https://code.visualstudio.com/docs
- Install Node.js
    - https://code.visualstudio.com/docs/nodejs/nodejs-tutorial

---
---
---

# An Introduction to Values, Types, and Operators in JavaScript

## Introduction to JavaScript Values
- **Key Point:** JavaScript is a **dynamic** language that can handle different types of values.
  - **Weakly typed**: allows implicit type conversion stead of throwing type error.
- **Definition:** Values are the pieces of data that we manipulate in programs.
- **Example:** Numbers, Strings, Booleans, Objects, etc.

---

## Primitive Values
- **Description:** JavaScript has seven primitive types.
  - **Types:** 
    - **Number**
    - **String**
    - **Boolean**
    - **BigInt**: Big Integer
    - **Symbol** (ES6): an unique value
    - **Undefined**
    - **Null**
- **Example:**

    ```javascript
  let age = 25; // Number
  let name = "Alice"; // String
  let isStudent = true; // Boolean
  let tenQuadrillions = 10000000000000000n; // BigInt
  let symbol = Symbol("unique"); // Symbol
  let myVar; // Undefined
  let myNullVar = null; // Null
  ```

---

## Numbers in JavaScript
- **Key Points:**
  - JavaScript uses a single number type (floating-point format).
  - You can perform calculations as addition, subtraction, multiplication, and division.
- **Example:**

  ```js 
  console.log(10 + 5); // Addition: 15
  console.log(10 - 5); // Subtraction: 5
  console.log(10 * 5); // Multiplication: 50
  console.log(10 / 5); // Division: 2
  console.log(10 % 3); // Remainder of division: 1
  console.log(10 ** 3); // Power: 10^3 = 1000
  ```

---

## Strings in JavaScript
- **Description:** Strings are sequences of characters enclosed in quotes.
    ```javascript
    `Down on the sea`
    "Lie on the ocean"
    'Float on the ocean'
    ```
- Backslash inside quoted text allows *escape characters*.
    - An useful example is **newline**: `'\n'`

### Strings in JavaScript: Operations
- **Key operations:**
  - Concatenation using `+`
  - Template literals for embedding expressions
- **Example:**
  ```js
  let greeting = "Hello, " + "world!"; // Concatenation
  console.log(greeting); // Output: "Hello, world!"
  
  let name = "Bob";
  console.log(`Hello, ${name}!`); // Template literals
  ```

---

## Booleans
- **Definition:** Boolean values represent `true` or `false`.
- **Usage:** Commonly used in conditional statements.
- **Example:**
  ```js
  let isRaining = false;
  if (isRaining) {
      console.log("Take an umbrella!");
  } else {
      console.log("Enjoy the sunshine!");
  }
  ```

### Booleans: Comparison
- **Comparison**: 
    - Operates over expressions (*e.g.* arithmetic).
    - Results in a **Boolean value**.
- Examples of comparison operators:
    - `>`: greater than
    - `<`: less than
    - `>=`: greater than or equal to
    - `<=`: less than or equal to
    - `==`: equal to
    - `!=`: not equal to

### Booleans: Logical Operators
- **Logical operators**: 
    - Operate over logical expressions (*e.g.* comparison).
    - Result in a **Boolean value**.
- There are three logical operators:
    - `&&`: logical and
    - `||`: logical or
    - `!`: logical not (is a unary operator)

### Booleans: Examples of Expressions

- Examples with logical operators, comparison expressions and arithmetic expressions.
    ```js
    let x = 18;
    let ok = true;
    console.log(x >= 0 && x <= 20); // x is in the interval [0, 20]
    console.log(x < 0 || x > 20); // x is not in the interval [0, 20]
    console.log(!(x >= 0 && x <= 20)); // the same as above
    console.log((x >= 0 && x <= 20) && ok);
    console.log(((x + 3) >= 0 && (x + 3) <= 20) && ok);
    ```

### Booleans: Ternary Conditional Operators
- `A ? B : C`: the result will be `B` when `A` is `true` and `C` otherwise.
- Examples:
    ```js
    console.log(true ? 1 : 2);
    // → 1
    console.log(false ? 1 : 2);
    // → 2
    console.log((99 % 2 == 0) ? "even" : "odd");
    // → odd
    ```

---

## Undefined and Null
- **Undefined:** A variable that has been declared but not assigned a value.
- **Null:** A special value representing "no value".
- **Example:**
  ```js
  let x; // x is undefined
  console.log(x); 
  // → undefined

  let y = null; // y is explicitly set to null
  console.log(y);
  // → null
  ```

---

## Type Checking
- Use `typeof` to check the type of a value.
- **Example:**
  ```js
  console.log(typeof 42); 
  // → number
  console.log(typeof "hello"); 
  // → string
  console.log(typeof true); 
  // → boolean
  console.log(typeof 123n); 
  // → bigint
  console.log(typeof undefined); 
  // → undefined
  console.log(typeof null); // (a known quirk)
  // → object
  ```

---

## Automatic Type Conversion 
- **Coercion**: JS forces value conversion to "fit" the operations.

```js
console.log(8 * null)
// → 0
console.log("5" - 1)
// → 4
console.log("5" + 1)
// → 51
console.log("five" * 2)
// → NaN
console.log(false == 0)
// → true
```

### Comparison without Coercion

- `===`: strict equality.
```js
console.log(false == 0) // loose equality (has coercion of types)
// → true
console.log(false === 0) // strict equality
// → false
```

- `!==`: strict inequality.
```js
console.log(null != undefined); // loose inequality
// → false
console.log(null !== undefined); // strict inequality
// → true
```

- To avoid coercion, use the strict (in)equality.

---