const urlArray = [
    "https://eloquentjavascript.net/05_higher_order.html",
    "https://eloquentjavascript.net/11_async.html"
    //, "http://not.exist"
];

promiseArray = urlArray.map(url => fetch(url));

Promise.all(promiseArray)
    .then(arrResp => {
        const arrPromiseText = [];
        for (let resp of arrResp)
            arrPromiseText.push(resp.text());
        return Promise.all(arrPromiseText);
    })
    .then(arrText => arrText.reduce((t1, t2) => t1.length + t2.length))
    .then(totalLen => console.log(totalLen))
    .catch(err => console.error("ERROR!"));

// Promise.all(promiseArray)
//     .then(arrResp => Promise.all(arrResp.map(resp => resp.text())))
//     .then(arrText => arrText.reduce((t1, t2) => t1.length + t2.length))
//     .then(totalLen => console.log(totalLen));

function promiseAll(arrayPromises){
    const arrayValues = [];
    let count = 0;
    let rejected = false;
    return new Promise((resolve, reject) => {
        for (let p of arrayPromises){
            p.then(value => {
                arrayValues.push(value);
                count++;
                if (count == arrayPromises.length)
                    resolve(arrayValues);
            }).catch(err => {
                if (! rejected){
                    reject(err);
                    rejected = true;
                }
            });

        }
    });
}
