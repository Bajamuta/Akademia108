const maths = require('./modules/modules-es5/mymaths/mymaths.js')
let minimum = parseInt(process.argv[2]);
let maximum = parseInt(process.argv[3]);
console.log('Your results in JS:', maths.random(minimum,maximum));