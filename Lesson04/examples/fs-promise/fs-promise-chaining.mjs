import { readFile, writeFile } from 'node:fs/promises'

const INPUT_FILE  = "./aFile.txt";
const OUTPUT_FILE = "./writeFile2.txt";

console.log("BEGIN");

// --------------------------
// Chaining promises
// --------------------------

readFile(INPUT_FILE)        // Promise<Buffer>
    .then(processFirstLine) // Promise<String>
    .then(processWriteFile) // Promise<undefined>
    .then(confirmWriteFile) // Promise<undefined>
    .catch(processError);

console.log("END");


function processFirstLine(fileContent) {

    console.log("File content ready");
    const fileContentStr = fileContent.toString();
    console.log(fileContentStr);

    const firstLine = fileContentStr.split('\n')[0];

    return firstLine;
}

function processWriteFile(firstLine){
    return writeFile(OUTPUT_FILE, firstLine);
}

function confirmWriteFile() {
    console.log("File", OUTPUT_FILE, "written with success!");
}

function processError(err) {
    console.log("Error handling file");
    console.log(err);
}
