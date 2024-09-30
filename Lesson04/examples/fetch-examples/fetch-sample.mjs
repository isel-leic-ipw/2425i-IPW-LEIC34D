const URL_CHUCK_NORRIS_JOKE = "https://api.chucknorris.io/jokes/mLUozC5_T3uidSRnZ0nNgQ";


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
