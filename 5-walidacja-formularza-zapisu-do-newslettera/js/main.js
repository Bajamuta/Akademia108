let b = document.getElementById('btn-wyslij');
let frm = document.getElementById('formularz');
let imNazw = document.getElementById('imieNazwisko');
let em = document.getElementById('email');
let wszystkieZgody = document.getElementById('wszystkieZgody');
let zgoda1 = document.getElementById('zgoda1');
let zgoda2 = document.getElementById('zgoda2');

wszystkieZgody.addEventListener('change', () => {
       zgoda1.checked = wszystkieZgody.checked;
       zgoda1.disabled = wszystkieZgody.checked;
       zgoda2.checked = wszystkieZgody.checked;
       zgoda2.disabled = wszystkieZgody.checked;
});

b.addEventListener('click', (evt) => {
    evt.preventDefault();
    let errors;
    if (!frm.checkValidity()) {
        if (!document.getElementById('errors')) {
            errors = document.createElement('ul');
            errors.classList.add('errors');
            errors.setAttribute('id', 'errors');
            document.body.appendChild(errors);
        }
        else {
            errors = document.getElementById('errors');
        }

        if (imNazw.validity.valueMissing) {
            addError("Podaj imię i nazwisko!", errors);
        }
        if (em.validity.valueMissing) {
            addError("Podaj adres e-mail!", errors);
        }
        if (em.validity.patternMismatch) {
            addError("Nieprawidłowy adres e-mail", errors);
        }
        console.log(em.pattern);
        if (zgoda1.validity.valueMissing) {
            addError("Zgoda1 jest wymagana!", errors);
        }
    }
});


function addError(message, ul) {
    const er = document.createElement('li');
    er.innerHTML = message;
    ul.appendChild(er);
}

const emailPattern = () => {

}
