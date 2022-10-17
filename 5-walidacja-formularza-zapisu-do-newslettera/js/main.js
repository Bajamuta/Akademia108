let b = document.getElementById('btn-wyslij');
let frm = document.getElementById('formularz');
let imNazw = document.getElementById('imieNazwisko');
let em = document.getElementById('email');
let wszystkieZgody = document.getElementById('wszystkieZgody');
let zgoda1 = document.getElementById('zgoda1');
let zgoda2 = document.getElementById('zgoda2');
let errors;

wszystkieZgody.addEventListener('change', () => {
       zgoda1.checked = wszystkieZgody.checked;
       zgoda1.disabled = wszystkieZgody.checked;
       zgoda2.checked = wszystkieZgody.checked;
       zgoda2.disabled = wszystkieZgody.checked;
});

b.addEventListener('click', (evt) => {
    evt.preventDefault();
    if (!frm.checkValidity()) {
        validate();
    }
});


function addError(message, ul) {
    const er = document.createElement('li');
    er.innerHTML = message;
    ul.appendChild(er);
}

function validate()
{
    if (!document.getElementById('errors')) {
        errors = document.createElement('ul');
        errors.classList.add('errors');
        errors.setAttribute('id', 'errors');
        document.body.appendChild(errors);
    }
    else {
        errors = document.getElementById('errors');
        errors.innerHTML = '';
    }
    if (imNazw.validity.valueMissing) {
        addError("Podaj imię i nazwisko!", errors);
    }
    if (em.validity.valueMissing) {
        addError("Podaj adres e-mail!", errors);
    }
    if (em.validity.patternMismatch) {
        addError("Nieprawidłowy adres e-mail! wzór: adres@domena.com", errors);
    }
    if (zgoda1.validity.valueMissing) {
        addError("Zgoda1 jest wymagana!", errors);
    }
}
