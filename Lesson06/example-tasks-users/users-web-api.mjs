import * as usersServices from "./users-services.mjs";

// FUNCTIONS (WEB API):

export function addUser(req, res){
  //console.log(req.body);
  if (usersServices.addUser(req.body.username)){
    res.status(201);
    res.send({message: `User ${user.id} was added with token ${user.token}`});
  }
  else{
    res.status(400);
    res.send({error: "Content is not in the expected format."});
  }
}
