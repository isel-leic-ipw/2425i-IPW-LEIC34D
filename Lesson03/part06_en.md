# Proposed Exercises

1. Implement a function that takes a string as a parameter and returns a histogram of the characters (not case sensitive) in the form of an object literal. The function must store the histograms already calculated in a *closure* to maintain the history of each character already processed in each call.
    - Example:
    ```js
    console.log(histogram("Era uma vez"));
    // → { E: 2, R: 1, A: 2, ' ': 2, U: 1, M: 1, V: 1, Z: 1 }
    console.log(histogram("uma casa no campo"));
    // → { E: 2, R: 1, A: 6, ' ': 5, U: 2, M: 3, V: 1, Z: 1, C: 2, S: 1, N: 1, O: 2, P: 1 }
    ```
2. Implement a constructor function to generate objects of type *Student*. Each object must have the following properties: name, a list of surnames, and a list of scores (each score from 0 to 20). Also include a method to modify the scores list by passing a new list as a parameter.
    1. Create 4 objects *Student* with your scores and add them to an array.
    2. Add a function to *Student*'s prototype that calculates the average of its scores. To implement this function, not use any loop (for/while) or forEach statements.
    3. Implement a function *highPerformance* that, given an array of *Student*, generates an array of objects with the name and average score of each student who has the average greater or equal to 17 (*e.g.*, `[{name: "Maria", average: 18}, {name: "João", average: 17.5}]`).
    4. Redo the previous item without using any loop (for/while) or forEach statements.
3. Implement a function to add elements of two arrays. Add this function to the prototype of `Array`. Example:
    ```javascript
    let arr1 = [1, 4, 3, 7];
    let arr2 = [5, 0, 2, 1];
    console.log(arr1.sumArray(arr2));
    // → [ 6, 4, 5, 8 ]
    ```
4. Override the function `console.info` to add a number at the beginning of each string to enumerate the prints. Note that this is a function, not an Object.
