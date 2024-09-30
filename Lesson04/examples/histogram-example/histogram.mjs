export function defHistogram(){
    let hist = {};
    return function (str){
        for (let l of str){
            let lL = l.toLowerCase();
            if (lL in hist){
                hist[lL] += 1;
            }
            else hist[lL] = 1;
        }
        return hist;
    };
}

//const histogram = defHistogram();
//console.log(histogram("Era uma vez"));
//console.log(histogram("uma casa no campo"));
