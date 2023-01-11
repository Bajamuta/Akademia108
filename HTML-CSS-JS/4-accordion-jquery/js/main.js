$(document).ready(() => {
   console.log('ready');
   $(".accordion-title").click((e) => {
      $(e.currentTarget).toggleClass("open");
      $($(e.currentTarget.parentElement).find("p")).slideToggle(1000);
   })
});
