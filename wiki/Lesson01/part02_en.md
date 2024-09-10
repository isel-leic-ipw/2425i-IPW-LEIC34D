# Program Structure

## Expressions and Statements
- **Expressions**: a piece of code that produces a value.

- **Examples**:
    - Simple: `2 + 3`
    - Complex: `5 * (2 + 8)`
- Expressions can be combined to form more complex expressions using operators.

### Statements:
- A statement performs an action, such as assigning a value or executing a command.

- **Examples**:

```javascript
let x = 10;  // Declaration and assignment statement
console.log(x);  // Expression statement
```

- Statements are often terminated by a semicolon (;), although it's optional in some cases. 

---

## Variables
- Variables store values that can be reused and manipulated throughout the program.
- Variables need to be declared.
- **Declaring variables**:
    - Keywords:
        - `let`: Declares a variable that can be reassigned.
        - `const`: Declares a constant variable (cannot be reassigned).
        - `var`: An older way to declare variables (largely replaced by let and const).
- Example:
    ```js
    let name = "ISEL";
    const greeting = "Hello ";
    console.log(greeting + name);
    // → Hello ISEL
    ```

### Variables Names and Reserved Words

- Any sequence of one or more **letters**.
    - Also include **digits**, but not in the start of the name.
    - Also include dollar signs (`$`) or underscores (`_`).
- Some keywords and reserved words (for reference):

    ```
    break  case  catch  class  const  continue  debugger  default  delete  do  else  enum  export  extends  false  finally  for  function  if  implements  import  interface  in  instanceof  let  new  package  private  protected  public  return  static  super  switch  this  throw  true  try  typeof  var  void  while  with  yield
    ```

### Capitalization
- JavaScript is case-sensitive.
- All examples below are different names:

    ```
    variablenameexample
    variable_name_example
    VariableNameExample
    variableNameExample
    ```

- The last one is preferred (by convention).
    - First letter of the words are capitalized, except for the first word.

---

## Functions
- **Function** is a "subprogram" composed by a sequence of statements.
    - May accept argument(s) as input.
    - May return value(s) as output.
- Example: the `console.log` function.
    ```js
    let x = 30;
    console.log("the value of x is", x);
    // → the value of x is 30
    ```
- In JavaScript, **function** is a subprogram wrapped in a **value**.
    - This means that functions work as values (*e.g.* can be assigned).
    - We will see more details further.


### Return Values
- A function can return values.
- For instance, the function `Math.max` return a Number:
    ```js
    console.log(Math.max(2, 4));
    // → 4
    ```
- Functions can be used within larger expressions.
    ```js
    console.log((Math.max(2, 4) * 3) >= 10);
    // → true
    ```

---

## Control Flow
- A program is a sequence of statements.

    ```js
    let theNumber = 7;
    let squareRoot = theNumber * theNumber;
    console.log("The number is the square root of " + squareRoot);
    ```

### Blocks
- A block is a sequence of statements wrapped in braces (`{` and `}`).
    ```js
    {
        console.log("Hello in a block");
    }
    ```

---

## Conditional
- Change the control flow according a condition.
    - The condition is a Boolean value or expression that returns a Boolean value.
- **Syntax**:
    ```javascript
    if (condition)
        // Statements or block
    else
        // Statements or block
    ```
- `else` statement is optional.
- Braces are optional if the block has only one statement.
- Example without else and braces:
    ```js
    if (1 + 1 == 2) console.log("It's true");
    // → It's true
    ```
- Example with else and braces:
    ```js
    let age = 20;
    if (age >= 18) {
        console.log("You are an adult.");
    } else {
        console.log("You are a minor.");
    }
    // → You are an adult.
    ```

---

## Loops
- Repeat a block of code multiple times.

### While
- Repeat a block as long as the condition is true.
- **Syntax**:

    ```javascript
    while (condition)
        // Statement or block
    ```

- Example:

    ```js
    let i = 5;
    console.log("Counting down 5:");
    while (i > 0) {
        console.log(i);
        i = i - 1;
    }
    console.log("Finished");
    ```

### Do-while

- Similar to while loop but the first block is always executed.

- **Syntax**:

    ```javascript
    do {
        // Statements
    } while (condition);
    ```

- Example:

    ```js
    let targetNum = 5; 
    let randomNum;
    console.log("An random experiment to target", targetNum);
    let count = 0;
    do {
        count++;
        randomNum = Math.floor(Math.random() * 10);
    }
    while (randomNum != targetNum);
    console.log("Need", count, "random experiments to reach the target");
    ```

### For
- Generally, a loop with a counter to repeat a block.

    ```javascript
    for (initialization; condition; increment/decrement)
        // Statements or block
    ```

- Example:
    ```js
    console.log("Counting down 5:");
    for (let i = 5; i > 0; i = i - 1) {
        console.log(i);
    }
    console.log("Finished");
    ```

- Additionally, there are `for-in` and `for-of` commands.
    - We will see these structures later... 

---

### Breaking Out of a Loop
- `break`: immediately jumping out of the enclosing loop.
- `continue`: control jumps out of the body and continues with the loop’s next iteration.

### Accumulation Variables
- JavaScript provides a shortcut for accumulation variables.
- Stead of:
    ```javascript
    i = i + 1;
    j = j - 1;
    ```
- Use the shortcuts (work with other operators, such as `*`, `/`, `**`):
    ```javascript
    i += 1;
    j -= 1;
    ```
- Or shorter:
    ```javascript
    i++;
    j--;
    ```

---

## Switch
- **Description**: Select a case (with label) given an expression.
- **Syntax**:
    ```javascript
    switch (expression) {
        case caseExpression1:
            // statement or block
        case caseExpression2:
            // statement or block
        // ...
        case caseExpressionN:
            // statement or block
        default:
            // statement or block
    }
    ```
- `break` is necessary if you want to stop the switch (most of the cases).
    - Otherwise, other cases will be executed!
- Example:
    ```js
    let weather = "sunny";
    switch (weather) {
        case "rainy":
            console.log("Remember to bring an umbrella.");
            break;
        case "sunny":
            console.log("Dress lightly.");
        case "cloudy":
            console.log("Go outside.");
            break;
        default:
            console.log("Unknown weather type!");
            break;
    }
    ```

---

## Comments
- **Description**: a piece of text in the code that is ignored during the execution.
    - Optional by **necessary**!
- Single-line comment:
    ```js
    // Example of a single-line comment:
    let x = 123;
    console.log(x); // print the value of x
    ```
- Block comment:
    ```js
    let year = 2100;

    /* A leap year is:
       - multiple of 400;
       - or multiple of 4 but not multiple of 100. */
    if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) {
        console.log(year, "is a leap year.");
    }
    else{
        console.log(year, "is not a leap year.");
    }
    ```

---

## Exercises

- From the book Eloquent JavaScript: 
    - https://eloquentjavascript.net/02_program_structure.html#h-TcUD2vzyMe

---