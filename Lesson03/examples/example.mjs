import {dayName} from "./dayname.mjs";

let now = new Date();

console.log(`Today is ${dayName(now.getDay())}`);