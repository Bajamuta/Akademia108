window.addEventListener("scroll", () => {
    if (scrollToEndOfPage())
    {
        getData();
    }
});

function scrollToEndOfPage() {
    return window.innerHeight + window.scrollY === document.documentElement.scrollHeight;
}

function getData() {
    displayLoading();
    fetch("https://akademia108.pl/api/ajax/get-users.php")
        .then(res => res.json())
        .then(data => {
            hideLoading();
            console.log(data);
            data.forEach(
                el => {
                    const br2 = document.createElement("br");
                    const userId = document.createElement("p");
                    userId.innerText = "User ID: " + el.id;
                    const username = document.createElement("p");
                    username.innerText = "User Name: " + el.name;
                    const url = document.createElement("p");
                    url.innerText = "User URL: " + el.website;
                    url.append(br2);
                    url.append("-----");
                    const main = document.getElementById("main");
                    const load = document.getElementById("loading");
                    main.insertBefore(userId, load);
                    main.insertBefore(username, load);
                    main.insertBefore(url, load);
                }
            );
        })
}

function displayLoading() {
    const loader = document.getElementById("loading");
    loader.classList.add("display");
    setTimeout(() => {
        loader.classList.remove("display");
    }, 10000);
}

function hideLoading() {
    const loader = document.getElementById("loading");
    loader.classList.remove("display");
}
