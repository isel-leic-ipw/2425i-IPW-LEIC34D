import express from 'express';
import fs from 'node:fs/promises';

const PORT = 7200;
const app = express();

app.get('/', readFile);

app.use(errorHandler);

app.listen(PORT, () =>
    console.log(`Example app listening on port ${PORT}!`),
  );

// Functions:

function readFile (req, res, next) {
    const filePromise = fs.readFile('/file-does-not-exist');
    return filePromise.then(data => res.send(data))
    .catch(err => next(err));
}

function errorHandler(err, req, res, next){
    res.status(404);
    res.send(err);
}

//git remote -rename

//coordenador do curso, comissão