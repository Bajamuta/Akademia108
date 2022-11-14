$(document).ready(() => {
   $('#hamburger').click(() => {
      if ($('.hamburger-init')[0].checked)
      {
         $('#navbarNav').addClass('collapse');
      }
      else
      {
         $('#navbarNav').removeClass('collapse');
      }
   });
});
