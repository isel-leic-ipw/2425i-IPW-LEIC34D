const URL_RANDOM_JOKE = "https://official-joke-api.appspot.com/random_joke";

async function showJoke(){
    try {
        const resp = await fetch(URL_RANDOM_JOKE);
        const obj  = await resp.json();
        console.log(obj.setup);
        setTimeout(() => { console.log(obj.punchline); }, 3000);
    }
    catch (e){
        console.log("Error");
    }
}

console.log("BEGIN ASYNC");
showJoke();
console.log("END ASYNC");