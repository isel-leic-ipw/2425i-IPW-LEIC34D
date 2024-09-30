import { readFile, writeFile } from 'node:fs/promises'

const INPUT_FILE  = "./aFile.txt";
const OUTPUT_FILE = "./writeFile.txt";

console.log("BEGIN")

//const p = readFile(INPUT_FILE)
//p.then(processFile)
//p.catch(processError)

readFile(INPUT_FILE)
    .then(processFile)
    .catch(processError)

console.log("END")

function processFile(fileContent) {
    console.log("File content ready");
    const fileContentStr = fileContent.toString();
    console.log(fileContentStr);

    const firstLine = fileContentStr.split('\n')[0];

    writeFile(OUTPUT_FILE, firstLine)
        .then(confirmWriteFile)
        .catch(processError);
    
    function confirmWriteFile() {
        console.log("File", OUTPUT_FILE, "written with success!");
    }
}

function processError(err) {
    console.log("Error handling file!");
    console.log(err);
}

