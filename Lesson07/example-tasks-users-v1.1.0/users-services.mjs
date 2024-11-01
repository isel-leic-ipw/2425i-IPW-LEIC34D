import crypto from 'node:crypto';

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
  if (USERS.find(user => username == user.name)){
    return false;
  }
  else {
    let user = {
      id: nextId(),
      token: crypto.randomUUID(),
      name: username
    };
    USERS.push(user);
    return true;
  }
}

export function getUserId(token){
  let user = USERS.find(user => user.token == token);
  if (user)
    return user.id;
}
