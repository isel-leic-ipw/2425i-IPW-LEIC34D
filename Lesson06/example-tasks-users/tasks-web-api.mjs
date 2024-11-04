import * as tasksServices from "./tasks-services.mjs";

// FUNCTIONS (WEB API):

export function getTask(req, res){
    //console.log(req.params.id);
    const token = getToken(req);
    let task = tasksServices.getTask(req.params.id, token);
    if (task)
      res.send(task);
    else
      res.status(404).end();
}

export function getAllTasks(req, res){
  //res.set("Content-Type", "application/json");
  //res.send(JSON.stringify(tasksServices.getAllTasks()));
  const token = getToken(req);
  res.json(tasksServices.getAllTasks(token));
}

export function addTask(req, res){
  //console.log(req.body);
  const token = getToken(req);
  let task = tasksServices.addTask(req.body, token);
  if (task){
    res.status(201);
    res.send({message: `Task ${task.id} was added!`});
  }
  else{
    res.status(400);
    res.send({error: "Content is not in the expected format."});
  }
}

export function deleteTask(req, res){
  const token = getToken(req);
  let deleteTask = tasksServices.deleteTask(req.params.id, token);
  if (deleteTask){
    res.json(deleteTask);
  }
  else{
    res.status(404).end();
  }
}

export function updateTask(req, res){
  const userToken = getToken(req);
  let updatedTask = tasksServices.updateTask(req.params.id, req.body, userToken);
  if (updatedTask){
    res.json(updatedTask);
  }
  else{
    res.status(404).end();
  }
}

// Auxiliary module function
function getToken(req) {
  const authToken = req.get("Authorization");
  if (authToken){
    const tokenParts = authToken.split(" ");
    if(tokenParts && tokenParts[0] == "Bearer") {
        return tokenParts[1];
    }
  }
}

