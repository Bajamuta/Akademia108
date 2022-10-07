const form = document.getElementById('form');
let fname;
let lname;
function handleSubmit(event) {
    event.preventDefault();
    fname = form.getElementsByTagName("input").namedItem('fname').value;
    lname = form.getElementsByTagName("input").namedItem('lname').value;
    console.log('Wartości:', fname, lname);
}
form.addEventListener('submit', handleSubmit);
