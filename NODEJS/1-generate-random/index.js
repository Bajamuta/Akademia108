const maths = require('./modules/modules-es5/mymaths/mymaths.js')
let minimum = parseInt(process.argv[2]);
let maximum = parseInt(process.argv[3]);
let length = parseInt(process.argv[4]);
console.log('Your random number in JS:', maths.randomNumber(minimum,maximum));
console.log('Your random string in JS:', maths.randomText(length));