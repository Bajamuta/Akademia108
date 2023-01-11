function dzialania(l1, l2) {
    console.log('Wynik dodawania wynosi:', l1 + l2);
    if (l1 >= l2)
    {
        console.log('Wynik odejmowania wynosi:', parseInt(l1) - parseInt(l2));
    }
    else
    {
        console.log('Odejmowanie: wynik jest nieprawidłowy');
    }
    console.log('Wynik mnożenia wynosi:', parseInt(l1) * parseInt(l2));
}

let num1 = prompt('Podaj pierwszą liczbę');
let num2 = prompt('Podaj drugą liczbę');

dzialania(num1, num2);
