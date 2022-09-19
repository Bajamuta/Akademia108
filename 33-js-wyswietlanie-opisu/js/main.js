let p = document.getElementById('opis');
document.querySelector('button').onclick = function () {
    dodajOpis();
}
function dodajOpis() {
    p.textContent = 'Lorem ipsum dolor si amet';
}
