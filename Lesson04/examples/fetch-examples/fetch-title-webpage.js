const URL = "https://loquentjavascript.net/11_async.html";

// Using promises explicitly
fetch(URL)
    .then((resp) => resp.text())
    .then((text) => console.log(getTitle(text)))
    .catch((err) => console.error("Error!!"));

function getTitle(text){
    let start = text.indexOf("<title>");
    let end   = text.indexOf("</title>");
    return text.slice(start+"<title>".length, end);
}

// Using async/await
async function showTitleWebPage(url) {
    try {
        const rsp = await fetch(url);                // Response
        const text = await rsp.text();               // String  
        const title = getTitle(text);                // String
        console.log(title);                          // undefined  
    }
    catch (e){
        console.error("Error!!", e);
    }
}

showTitleWebPage(URL);