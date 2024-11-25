//import * as usersServices from "../../services/users-services.mjs";
import { errors } from "../../commons/errors.mjs";

// FUNCTIONS (WEB API):

export default function init(usersServices){

  // Verify the dependencies:
  if(! usersServices){
    throw errors.INVALID_ARGUMENT('usersServices');
  }

  return({
    addUser
  });

  function addUser(req, res, next){
    //console.log(req.body);
    usersServices.addUser(req.body.username)
      .then(user => {
        res.status(201);
        res.send({token: user.token});  
      })
      .catch(e => next(e));
  }

}
