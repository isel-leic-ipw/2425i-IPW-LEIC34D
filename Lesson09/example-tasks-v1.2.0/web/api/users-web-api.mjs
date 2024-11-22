import * as usersServices from "../../services/users-services.mjs";

// FUNCTIONS (WEB API):

export function addUser(req, res, next){
  //console.log(req.body);
  usersServices.addUser(req.body.username)
    .then(user => {
      res.status(201);
      res.send({token: user.token});  
    })
    .catch(e => next(e));
}
