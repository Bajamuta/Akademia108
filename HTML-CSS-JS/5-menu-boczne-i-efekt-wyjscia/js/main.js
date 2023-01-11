$(document).ready(function () {
   $(".hamburger").click( () => {
       $(".hamburger-cross").toggleClass('visible').toggleClass('hidden');
       $(".hamburger-lines").toggleClass('visible').toggleClass('hidden');
       $(".main-menu").toggleClass('visible').toggleClass('hidden');
   }
   );
   $(".main-menu-item a").click((e) => {
       e.preventDefault();
       $("body").fadeOut(2000, () => {
           window.location.replace(e.currentTarget.href);
       });
   })
});
