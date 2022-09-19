let paragraf = document.querySelector('p');
document.getElementById('dodaj').onclick = function () {
    paragraf.textContent = 'Lorem ipsum dolor si amet';
}
document.getElementById('usun').onclick = function () {
    paragraf.textContent = '';
}
