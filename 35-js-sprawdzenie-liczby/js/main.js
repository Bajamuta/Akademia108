let input;
function sprawdz(m) {
    return m >= 100 && m <= 200 ? 'Liczba znajduje się w przedziale' : 'Liczba nie znajduje się w przedziale';
}
input = prompt('Podaj liczbę');
console.log('Wynik:', sprawdz(input));
