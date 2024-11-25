export default function init(){
    return {
        printSum: printSum
    };

    function printSum(a, b){
        console.log(a + b);
    }
}