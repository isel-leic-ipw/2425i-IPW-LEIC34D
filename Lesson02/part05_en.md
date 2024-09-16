# Higher-Order Functions

- **Definition**: functions that operate on other functions, either by taking them as arguments or by returning them.

- Returning a function:
    ```js
    function greaterThan(n) {
        return m => m > n;
    }
    let greaterThan10 = greaterThan(10);
    console.log(greaterThan10(11));
    // → true
    ```

- Passing a function as argument (callback function):
    ```js
    function sayHello() {
        return "Hello, ";
    }
    function greeting(helloMessageFunc, name) {
        console.log(helloMessageFunc() + name);
    }

    greeting(sayHello, "ISEL");
    // → Hello, ISEL
    ```

## Examples of Callback Function Usage
- Here, we'll see examples of 4 functionality about arrays:

    1. **ForEach**: apply a callback function for each element of an array;
    2. **Filter**: filter elements of an array according to a predicated function and return an new array of these elements.
    3. **Map**: return an array with the returned value of a callback function applied to each element of an array.
    4. **Reduce**: combine all elements of an array according to a combination function.

- Let's explore callback functions in two ways:

    1. Implementing **our** function with callback function;
    2. Using **built-in** array method.

### My ForEach

- Objective: apply a callback function for each element of an array.
- Parameters:
    - an array;
    - a function (callback).
- Return: nothing.

    ```js
    const names = ['Ana', 'Bob'];
    myForEach(names, elem => console.log(elem));
    //myForEach(names, function (elem){ console.log(elem);});
    // → Ana
    // → Bob

    function myForEach(arr, callbackfn){
        for (elem of arr){
            callbackfn(elem);
        }
    }
    ```
- Using anonymous function:
    ```javascript
    myForEach(names, function (elem){ console.log(elem);});
    ```

### ForEach Built-in Array Method

- There is a built-in method (`forEach`) available for an array.
    - It is similar to for-of loop, as in `myForEach`.
    ```js
    const arr = ["Ana", "Bob"];
    arr.forEach(l => console.log(l));
    // → Ana
    // → Bob
    ```

### My Filter

- Objective: filter elements of an array according to a predicated function and return an new array of these elements.
- Parameters:
    - an array;
    - a predicate: a callback function that returns true or false.
- Return: a new array.
- Examples:
    - Filter even number of an array.
    - Filter number greater than 10 of an array.
    ```js
    const arrEx = [1, 4, 3, 20, 11, 5, 2, 6, 8];
    console.log(myFilter(arrEx, (n) => n % 2 == 0));
    // → [ 4, 20, 2, 6, 8 ]
    console.log(myFilter(arrEx, (n) => n > 10));
    // → [ 20, 11 ]

    function myFilter(arr, predicate){
        let res = [];
        for (elem of arr){
            if (predicate(elem)){
                res.push(elem);
            }
        }
        return(res);
    }
    ```

### Filter Built-in Array Method

- There is a built-in method (`filter`) available for an array.
    ```js
    const arrEx = [1, 4, 3, 20, 11, 5, 2, 6, 8];
    console.log(arrEx.filter((n) => n % 2 == 0));
    // → [ 4, 20, 2, 6, 8 ]
    console.log(arrEx.filter((n) => n > 10));
    // → [ 20, 11 ]
    ```

### My Map

- Objective: map an operation for each element of an array.
- Parameters:
    - an array;
    - a callback function that returns the value of the mapped operation.
- Return: a new array.
- Example:
    - Map the square ($n \times n$) to each number of an array.
    ```js
    const arrEx = [1, 4, 3, 20, 11, 5, 2, 6, 8];
    console.log(myMap(arrEx, (n) => n * n));
    // → [ 1, 16,  9, 400, 121, 25,  4, 36,  64 ]

    function myMap(arr, callbackfn){
        let res = [];
        for (elem of arr){
            res.push(callbackfn(elem));
        }
        return res;
    }
    ```

### Map Built-in Array Method

- There is a built-in method (`map`) available for an array.
    ```js
    const arrEx = [1, 4, 3, 20, 11, 5, 2, 6, 8];
    console.log(arrEx.map((n) => n * n));
    // → [ 1, 16,  9, 400, 121, 25,  4, 36,  64 ]
    ```

### My Reduce

- Objective: combine all elements of an array according to a combination function.
- Parameters:
    - an array;
    - combination: a callback function that returns the combination of two values.
- Return: a value.
- Example:
    - Sum all values of an array.
    ```js
    const arrEx = [1, 2, 4];
    console.log(myReduce(arrEx, (elem1, elem2) => elem1 + elem2));
    // → 7

    function myReduce(arr, callbackfn){
        //if (arr == null) return undefined;
        let current = arr[0];
        for (let i = 1; i < arr.length; i++){
            current = callbackfn(current, arr[i]);
        }
        return current;
    }
    ```

### Reduce Built-in Array Method

- There is a built-in method (`reduce`) available for an array.
    ```js
    const arrEx = [1, 2, 4];
    console.log(arrEx.reduce((elem1, elem2) => elem1 + elem2));
    // → 7
    ```

### Composing Operations

- In the case of built-in methods, the result can be operated by another method.
- Example (filter + map): apply the square function to all even elements of an array.

    ```js
    const arrEx = [1, 2, 3, 4];
    console.log(arrEx.filter((n) => n % 2 == 0).map((n) => n * n));
    // → [ 4, 16 ]
    ```

- Example (map + reduce): sum each square of a number in an array.

    ```js
    const arrEx = [1, 2, 3, 4]; // 1 + 4 + 9 + 16 = 30
    console.log(arrEx.map(((n) => n * n)).reduce((elem1, elem2) => elem1 + elem2));
    // → 30
    ```

## Exercises

- From the book Eloquent JavaScript: 
    - https://eloquentjavascript.net/05_higher_order.html#h-TcUD2vzyMe
    - *Flattening*, *Your own loop*, and *Everything* exercises.
---