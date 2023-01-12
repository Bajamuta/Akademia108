import * as mymaths from "./modules/modules-es5/mymaths";
let minimum = parseInt(process.argv[2]);
let maximum = parseInt(process.argv[3]);
console.log('Your results in typescript:', mymaths.random(minimum, maximum));