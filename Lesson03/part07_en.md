

# Modules, Node.js, NPM and Testing

## JavaScript Modules
- The original JavaScript language did not have any concept of a module.
- Since ECMAScript 2015, JavaScript supports two different types of programs:
    - *Scripts*: all script in the same scope (global).
    - *ES Modules*: modules with their own separate scope.

### Modular Program
- **Module**: a piece of program with functionality and with interface to other modules.
- A modular program is composed of modules.
- **Dependency**: 
    - If a module A uses a module B, then A depends on B.
- Modules are connected by their *imports* and *exports*.

### Packages
- A package is a chunk of code that can be distributed (copied and installed).
- It contains:
    - One or more modules;
    - Their dependencies (other packages);
    - Documentation.
- [NPM (Node.js Package Manager)](https://www.npmjs.com/)
    - Installed with Node.js

## Node.js

### Modules
- Two ways:
    - Javascript/ECMAScript Module - ESM
        - Uses `export`, `import`, as we see before.
        - Exported files has extension `.mjs`
    - CommonJS Module - CJS
        - To import: use of keyword `require`
        - To export: use of `modules.export`
        - Exported files has extension `.cjs`
- **We will use the ESM**.

### Import and Export
- The keyword `export` is used to interface a function or any binding definition.
    - Example:
    ```javascript
    const names = ["Sunday", "Monday", "Tuesday", "Wednesday",
                   "Thursday", "Friday", "Saturday"];

    export function dayName(number) {
        return names[number];
    }
    export function dayNumber(name) {
        return names.indexOf(name);
    }
- The keyword `import` is used to get one or more exported bindings.
    - Example:
    ```javascript
    import {dayName} from "./dayname.mjs";
    let now = new Date();
    console.log("Today is", dayName(now.getDay()));
    // → Today is Monday
    ```
- Notes:
    - The import has a list of biding names in braces.
    - Modules are identified by strings after the keyword `from`.
    - Import and export declarations cannot appear inside of functions, loops, or other blocks.

### Import Interface
- Imported bindings can be renamed to a new local name using `as` after their name.
- Example:
    ```javascript
    import {dayName as nomeDoDia} from "./dayname.mjs";
    console.log(nomeDoDia(3));
    // → Wednesday
    ```
- To import all bindings from a module at the same time, you can use import `*`.
- Example:
    ```javascript
    import * as dn from "./dayname.mjs";
    console.log(dn.dayName(3));
    // → Wednesday
    ```

### NPM
- Provides tools (in command line) to create projects, add dependencies, test, ...

### Basic Commands
- Creating a project in the current directory:
    ```bash
    npm init
    ```
    - You should provide the required information.
    - The file `package.json` is generated.
        - See https://docs.npmjs.com/cli/v10/configuring-npm/package-json
    - Example of a `package.json` content:
        ```json
        {
            "name": "examples",
            "version": "1.0.0",
            "description": "Test examples",
            "main": "index.js",
            "scripts": {
                "test": "echo \"Error: no test specified\" && exit 1"
            },
            "author": "Professor",
            "license": "ISC"
        }
        ```
- Installing a package:
    ```bash
    npm install <package name>
    ```
    - Example: installing `express` package:
        ```bash
        npm install express
        ```

## Testing with Mocha

### Mocha Install
- Installing Mocha in the project for development:
    ```bash
    npm install mocha --save-dev
    ```

### Basic Test Description
- One or more files in JavaScript Language.
    - Files must be in `test` directory, by default.
- Function `describe`: groups tests with a description string.
- Function `it`: individual test.
    - Has an *arrange* step to define values to test;
    - has an *act* step to call the function to test;
    - has an *assert* step to verify the output.
- Example:
    ```javascript
    describe("Simple test suite", () => {
        // Arrange

        it("Test 1", () => {
            // Arrange
            // Act
            // Assert                
        });
    });
    ```

### Assert
- Function `assert` from module `node:assert`.
    - See https://nodejs.org/api/assert.html
    - To import, use the CSM form.


### Basic Usage
- Add mocha to package.json in the property `test` from property `script`.
- Command to test with NPM:
    ```bash
    npm test
    ```

## Exercises

1. Implement a test with Mocha for the item 1 (histogram) from the proposed exercise in part06.
    - Examples of inputs and expected outputs:
        - `"aaaa"` -> `{ a : 4 }`
        - `"bbbb"` -> `{ a : 4, b : 4 }`
        - `"BBb"` -> `{ a : 4, b : 7 }`
