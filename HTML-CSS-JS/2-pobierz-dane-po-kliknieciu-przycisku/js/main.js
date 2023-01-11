const btn = document.createElement("button");
btn.innerText = "POBIERZ DANE";
document.getElementById("main").append(btn);
btn.addEventListener("click", () => {
   getUserData();
});

function getUserData () {
    fetch("https://akademia108.pl/api/ajax/get-post.php")
        .then(res => res.json())
        .then(data => {
            let id = document.createElement("p");
            id.innerText = "Post id:" + data.id;
            let title = document.createElement("h2");
            title.innerText = data.title;
            let art = document.createElement("article");
            let body = document.createElement("p");
            body.innerText = data.body;
            let userId = document.createElement("span");
            userId.innerText = "Created by: " + data.userId;
            userId.classList.add('author');
            art.append(body);
            body.append(userId);
            document.getElementById("main").append(id);
            document.getElementById("main").append(title);
            document.getElementById("main").append(art);
        })
        .catch(error => console.error(JSON.stringify(error)))
}
