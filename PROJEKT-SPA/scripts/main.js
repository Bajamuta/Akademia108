$(document).ready(() => {
   $('#hamburger').click(() => {
      $('#hamburger').toggleClass('clicked');
      $('#navbarNav').toggleClass('collapse');
   });
});
