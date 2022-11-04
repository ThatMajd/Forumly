
let m = document.createElement('meta')
let rows = document.getElementsByClassName("w-100 h-100 d-block")
let j = 0;
let idP = 'collapse'+j


m.name = 'viewport'
m.content = "width=device-width, initial-scale=1"
document.head.appendChild(m);

document.body.setAttribute("data-spy", "scroll")


Array.from(rows).forEach(function(element) {
    let link = element.getAttribute("href");

    fetch(link)
        .then(function (response) {
            switch (response.status) {
                // status "OK"
                case 200:
                    return response.text();
                // status "Not Found"
                case 404:
                    throw response;
            }
        })
        .then(function (template) {
            let html = new DOMParser().parseFromString(template, "text/html");
            let tmp = html.getElementsByTagName("article").item(0)

            idP = 'collapse'+j

            element.setAttribute('data-toggle', "collapse")
            element.setAttribute('data-target', '#'+idP)
            element.insertAdjacentHTML("afterend",
                "<div id=" + idP + " class=" + "\"collapse in\"" + ">\n" +
                        tmp.innerHTML +
                    "\n" +
                    "</div>"
            );
            j++;
        })
        .catch(function (response) {
            // "Not Found"
            console.log(response.statusText);
        });
});


