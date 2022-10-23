$(document).ready(function () {
   $(".hamburger").click( () => {
       $(".visible").addClass('hide').removeClass("visible");
       $(".hidden").removeClass('hidden').addClass('show');
       /*$(".hide").removeClass("hide").addClass("hidden");
       $(".show").removeClass("show").addClass("visible");*/
   }
   );
});
