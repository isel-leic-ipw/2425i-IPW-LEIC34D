
import { errors } from '../commons/errors.mjs';
import * as usersData from '../data/users-data-mem.mjs';

// FUNCTIONS (API services):

export function addUser(username){
  return usersData.addUser(username);
}

export function getUserId(token){
  return usersData.getUserIdByToken(token);
}