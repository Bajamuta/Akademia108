$(document).ready(function () {
   $(".hamburger").click( () => {
       $(".hamburger-cross").toggleClass('visible').toggleClass('hidden');
       $(".hamburger-lines").toggleClass('visible').toggleClass('hidden');
       $(".main-menu").toggleClass('visible').toggleClass('hidden');
   }
   );
});
