const URL = "https://eloquentjavascript.net/11_async.html";

// Using promises explicitly
fetch(URL)                                          // Promise<Response>
    .then((resp) => resp.text())                    // Promise<String>
    .then((text) => getTitle(text))                 // Promise<String>
    .then((title) => console.log(title))            // Promise<undefined>
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