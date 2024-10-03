import { readFile } from 'node:fs/promises';

const INPUT_FILE  = "./aFile.txt";

console.log("BEGIN");

let line;

//const p = readFile(INPUT_FILE); // Promise<Buffer>
//const p1 = p.then(processFile); // Promise<undefined>
//p.catch(processError);

readFile(INPUT_FILE)
    .then(processFile)
    .catch(processError);

console.log("--->", line);

console.log("END");

function processFile(fileContent) {
    console.log("File content ready");
    const fileContentStr = fileContent.toString();
    line = fileContentStr.split("\n")[0];
    console.log(fileContentStr);
    console.log(line);
}

function processError(err) {
    console.log("Error handling file!");
    console.log(err);
}

