import crypto from 'node:crypto';
import { errors } from '../../commons/errors.mjs';
import { fetchElastic } from './fetch-elastic.mjs';

// FUNCTIONS (API users data):

export default function init(){

  return {
    getUserIdByToken,
    addUser
  }

  function getUserId(matchObj){
    const match = {
      query: {
        match: matchObj
      }
    };
    return fetchElastic("POST", "/users/_search", match)
    .then(body => {
        const usersArray = body.hits.hits;
        console.log(usersArray);
        if(usersArray.length > 0)
          return(usersArray[0]._id);
      }
    );
  }

  function getUserIdByName(username){
    return getUserId({name: username});
  }

  function getUserIdByToken(token){
    return getUserId({token: token})
      .then(userId => {
        if (userId) return userId;
        return Promise.reject(errors.USER_NOT_FOUND());
      });
  }

  function addUser(username){
    // If username exists, body is invalid.
    // If username is not provided, body is also invalid.
    return getUserIdByName(username)
      .then(userId => {
          if (userId) {
            //console.log("user Id:", userId);
            return Promise.reject(errors.INVALID_BODY(username));
          }
          let user = {
            token: crypto.randomUUID(),
            name: username
          };
          return fetchElastic("POST", "/users/_doc", user)
            .then(body => body._id);  
        }
      );
  }
}