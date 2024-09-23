// --------------------------------
// Higher-order function
// --------------------------------

// --------------------------------
// For each:
// For each element, apply a function:
function myForEach(arr, callbackfn){
    for (let elem of arr){
        callbackfn(elem);
    }
}
const names = ['Ana', 'Bob'];
myForEach(names, elem => console.log(elem));
myForEach(names, function (elem){ console.log(elem);});
names.forEach((elem) => console.log(elem));

// Modify all elements of an array to upper case (not possible with forEach!):
names.forEach(elem => elem.toUpperCase()); // elem is a variable assigned to the elements of the array in the scope of the arrow function.
console.log("-->", names); // Not modify the elements!
names.forEach((elem, index, theArray) => theArray[index] = elem.toUpperCase());
console.log(names);

/*
// --------------------------------
// Filtering:
// Objective: filter elements of an array according to a predicated function and return an new array of these elements.
// Examples:
//  Filter the even numbers in [1, 4, 3, 20, 11, 5, 2, 6, 8] -> [4, 20, 2, 6, 8]
//  Filter the numbers greater than 10 in [1, 4, 3, 20, 11, 5, 2, 6, 8] -> [20, 11]
function myFilter(arr, predicate){
    let res = [];
    for (let elem of arr){
        if (predicate(elem)){
            res.push(elem);
        }
    }
    return(res);
}

// For instance, filter even elements:
console.log(myFilter([1, 4, 3, 20, 11, 5, 2, 6, 8], (n) => n % 2 == 0));
// For instance, filter elements greater than 10:
console.log(myFilter([1, 4, 3, 20, 11, 5, 2, 6, 8], (n) => n > 10));

// With filter built-in from an array:
console.log([1, 4, 3, 20, 11, 5, 2, 6, 8].filter((n) => n % 2 == 0));
console.log([1, 4, 3, 20, 11, 5, 2, 6, 8].filter((n) => n > 10));


// --------------------------------
// Mapping:
// Objective: Return an array with the returned value of a callback function applied to each element of an array.
function myMap(arr, callbackfn){
    let res = [];
    for (let elem of arr){
        res.push(callbackfn(elem));
    }
    return res;
}

console.log(myMap([1, 4, 3, 20, 11, 5, 2, 6, 8], (n) => n * n));
console.log([1, 4, 3, 20, 11, 5, 2, 6, 8].map((n) => n * n));

// Generate an array with
console.log(names, "-->", names.map(elem => elem.toUpperCase()));

// --------------------------------
// Reducing:
// Objective: combine all elements of an array according to a combination function.
function myReduce(arr, callbackfn){
    if (arr == null) return undefined;
    let current = arr[0];
    for (let i = 1; i < arr.length; i++){
        current = callbackfn(current, arr[i]);
    }
    return current;
}

console.log(myReduce([1, 2, 3], (elem1, elem2) => elem1 + elem2));
console.log([1, 2, 3].reduce((elem1, elem2) => elem1 + elem2));


// Some:
// Objective:returns true if the predicate function is true for some value of the array.
function mySome(arr, predicate){
    for (let elem of arr){
        if (predicate(elem)) return true;
    }
    return false;
}

console.log([1, 20, 2].some((elem) => elem > 20));
console.log(mySome([1, 20, 2], (elem) => elem > 20));

*/