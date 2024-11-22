
import * as usersData from '../data/elastic/users-data-elastic.mjs';

// FUNCTIONS (API services):

export function addUser(username){
  return usersData.addUser(username);
}

export function getUserId(token){
  return usersData.getUserIdByToken(token);
}