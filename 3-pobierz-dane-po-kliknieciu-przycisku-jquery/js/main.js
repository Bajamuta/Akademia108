$(document).ready(function () {
   const btn = document.createElement("button");
   btn.innerText = "POBIERZ DANE";
   $("body").append(btn);
   $("button").click(() => {
      $.get("https://akademia108.pl/api/ajax/get-post.php")
          .done(data => {
             console.log(data);
             $("#main").append(`<h1>get()</h1>`);
             $("#main").append(`<p>Post id: ${data.id}</p>`);
             $("#main").append(`<h2>${data.title}</h2>`);
             $("#main").append(`<article><p>${data.body}</p><p class="author">Created by: ${data.userId}</p></article>`);
          })
          .fail(error => console.error(JSON.stringify(error)));
      $.getJSON("https://akademia108.pl/api/ajax/get-post.php")
          .done(data => {
             console.log(data);
             $("#main").append(`<h1>getJSON()</h1>`);
             $("#main").append(`<p>Post id: ${data.id}</p>`);
             $("#main").append(`<h2>${data.title}</h2>`);
             $("#main").append(`<article><p>${data.body}</p><p class="author">Created by: ${data.userId}</p></article>`);
          })
          .fail(error => console.error(JSON.stringify(error)));
   });
});
