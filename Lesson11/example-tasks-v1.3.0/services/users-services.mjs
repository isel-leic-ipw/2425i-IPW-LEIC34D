
//import * as usersData from '../data/elastic/users-data-elastic.mjs';
import { errors } from "../commons/errors.mjs";

// FUNCTIONS (API services):

export default function init(usersData){

  // Verify the dependencies:
  if(! usersData){
    throw errors.INVALID_ARGUMENT('usersData');
  }

  return {
    addUser,
    getUserId
  };

  function addUser(username){
    return usersData.addUser(username);
  }

  function getUserId(token){
    return usersData.getUserIdByToken(token);
  }
}