const URL = "https://eloquentjavascript.net/11_async.html";

// Using promises explicitly
fetch(URL)
    .then((resp) => resp.text())
    .then((text) => console.log(getTitle(text)))
    .catch((err) => console.log("error", err));

function getTitle(text){
    let start = text.indexOf("<title>");
    let end   = text.indexOf("</title>");
    return text.slice(start+"<title>".length, end);
}

// Using async/await
async function showTitleWebPage(url) {
    const rsp = await fetch(url);                // Response
    const text = await rsp.text();               // String  
    const title = getTitle(text);                // String
    console.log(title);                          // undefined  
}

showTitleWebPage(URL);