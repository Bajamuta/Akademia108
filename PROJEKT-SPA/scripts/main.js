const appointmentMessage = $('.appointment-message')[0];
const appointmentForm = $('form[name="appointment-form"]');

$(document).ready(() => {
   $('#hamburger').click(() => {
      $('#hamburger').toggleClass('clicked');
      $('#navbarNav').toggleClass('collapse');
   });
   appointmentForm.on('submit', (event) => {
      event.preventDefault();
      appointmentMessage.classList.remove('danger');
      appointmentMessage.innerText = ``;
      let appointment = {};
      for (let i = 0; i < event.target.length - 1; i++)
      {
         let elem = event.target[i];
         if (elem.value.trim().length > 0)
         {
            appointment[elem.name] = elem.value;
            elem.classList.add('valid');
            elem.classList.remove('invalid');
         }
         else {
            elem.classList.add('invalid');
            elem.classList.remove('valid');
         }
      }
      if (Object.keys(appointment).length === event.target.length - 1)
      {
         createAppointment(appointment);
      }
      else {
         appointmentMessage.classList.add('text-danger');
         appointmentMessage.innerText = `Wypełnij pola oznaczone kolorem czerwonym!`;
      }
   });
});

function createAppointment(a) {
   fetch('https://akademia108.pl/api/ajax/post-appointment.php', {
      headers: {
         'Content-Type': 'application/json',
      },
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify(a)
   })
       .then(res => res.json())
       .then(resJSON => {
          console.log(resJSON);
          appointmentMessage.classList.add('text-success');
          appointmentMessage.innerText = `Dziękujemy ${resJSON.appointment.name}. Zostałeś zapisany!`
       });
}
