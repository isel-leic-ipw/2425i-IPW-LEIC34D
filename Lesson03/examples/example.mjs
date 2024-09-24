import {dayName} from "./dayname.mjs";

let now = new Date();

console.log(`Today is ${dayName(now.getDay())}`);

function a(x, y){
    return {a: x, b: y};
}

console.log(a(1, 2))
const f = (x, y) => ({a: x, b: y});
console.log(f(1, 2))