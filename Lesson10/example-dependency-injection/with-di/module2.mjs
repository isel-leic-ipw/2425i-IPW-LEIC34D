export default function init(){
    return {
        printHello: printHello
    };

    function printHello(name){
        console.log("Hello " + name);
    }
}