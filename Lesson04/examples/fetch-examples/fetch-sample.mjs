const URL_CHUCK_NORRIS_JOKE = "https://api.chucknorris.io/jokes/mLUozC5_T3uidSRnZ0nNgQ";
const URL_RANDOM_JOKE = "https://official-joke-api.appspot.com/random_joke";


// const responseP = fetch(URL_CHUCK_NORRIS_JOKE);
// const textP = responseP.then(resp => resp.text());
// const textP2 = textP.then(text => {console.log(text); return text});
// const lenP = textP2.then(text => text.length);
// const p = lenP.then(len => console.log(len));
// p.catch((err) => {console.log("Error")});

fetch(URL_CHUCK_NORRIS_JOKE)
    .then(resp => resp.text())
    .then(text => {console.log(text); return text})
    .then(text => text.length)
    .then(len => console.log(len))
    .catch((err) => console.log("Error"));


// fetch(URL_RANDOM_JOKE)
//     .then(resp => resp.json())
//     .then(obj => {console.log(obj.setup); return obj.punchline;})
//     .then(text => setTimeout(() => {console.log(text);}, 3000))
//     .catch(err => {console.log("Error")});