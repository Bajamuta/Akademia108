let l1;
let l2;

function sprawdz(num1, num2) {
    return parseInt(num1) === 20 || parseInt(num2) === 20 || (parseInt(num1) + parseInt(num2)) <= 20;
}
l1 = prompt('Podaj pierwszą liczbę');
l2 = prompt('Podaj drugą liczbę');
console.log('sprawdzenie:', sprawdz(l1, l2));
