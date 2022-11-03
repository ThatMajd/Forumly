
let rows = document.getElementsByClassName("w-100 h-100 d-block")

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
            element.insertAdjacentHTML("afterend", tmp.innerHTML);

        })
        .catch(function (response) {
            // "Not Found"
            console.log(response.statusText);
        });
});


