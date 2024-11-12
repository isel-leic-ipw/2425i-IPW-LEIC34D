import crypto from 'node:crypto';
import { errors } from '../commons/errors.mjs';

// FUNCTIONS (API services):

const USERS = [
  {
    id: 1,
    token: 'b0506867-77c3-4142-9437-1f627deebd67',
    name: 'asilva'
  },
  {
    id: 2,
    token: 'f1d1cdbc-97f0-41c4-b206-051250684b19',
    name: 'pnunes'
  },
];
let currentId = USERS.length + 1;

function nextId(){
  return(currentId++);
}

export function addUser(username){
  return new Promise((resolve, reject) => {
    // If user exists, body is invalid.
    // If username is not provided, body is also invalid.
    if (! username || USERS.find(user => user.username == username)){
      reject(errors.INVALID_BODY(username));
    }
    else{
      let user = {
        id: nextId(),
        token: crypto.randomUUID(),
        name: username
      };
      USERS.push(user);
      resolve(user);
    }
  });
}

export function getUserIdByToken(token){
  return new Promise((resolve, reject) => {
    let user = USERS.find(user => user.token == token);
    if (user)
      resolve(user.id);
    else
      reject(errors.USER_NOT_FOUND());
  });
}
