import * as usersServices from "../../services/users-services.mjs";

// FUNCTIONS (WEB API):

export function addUser(req, res){
  //console.log(req.body);
  const userToken = usersServices.addUser(req.body.username);
  if (userToken){
    res.status(201);
    res.send({token: userToken});
  }
  else{
    res.status(400);
    res.send({});
  }
}
