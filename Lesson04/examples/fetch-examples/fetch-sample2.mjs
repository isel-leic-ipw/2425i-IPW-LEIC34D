const URL_RANDOM_JOKE = "https://official-joke-api.appspot.com/random_joke";

console.log("BEGIN");

fetch(URL_RANDOM_JOKE)
    .then(resp => resp.json())
    .then(obj => {console.log(obj.setup); return obj.punchline;})
    .then(text => setTimeout(() => {console.log(text);}, 3000))
    .catch(err => {console.log("Error")});

console.log("END");