import mymaths from "./modules/modules-es5/mymaths";
let minimum = parseInt(process.argv[2]);
let maximum = parseInt(process.argv[3]);
let length = parseInt(process.argv[4]);
console.log('Your random number in typescript:', mymaths.randomNumber(minimum, maximum));
console.log('Your random string in typescript:', mymaths.randomText(length));
console.log('Your random array in typescript:', mymaths.randomArray(minimum, maximum, length));