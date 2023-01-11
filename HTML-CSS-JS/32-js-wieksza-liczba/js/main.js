let num1 = 2;
let num2 = 5;

function suma(l1, l2) {
    let temp = l1;
    if (l2 > l1) {
        temp = l2;
    }
    return temp;
}

console.log('większa liczba:', suma(num1, num2));
