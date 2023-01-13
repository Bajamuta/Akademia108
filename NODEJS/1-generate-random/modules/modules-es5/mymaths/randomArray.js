const randomNumber = require("./randomNumber");

function randomArray(min, max, length) {
    const arr = [];
    for (let i = 0; i < length; i++) {
        arr.push(randomNumber(min, max));
    }
    return arr;
}
module.exports = randomArray;