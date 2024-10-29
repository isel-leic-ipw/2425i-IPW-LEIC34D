import * as tasksServices from "./tasks-services.mjs";

// FUNCTIONS (WEB API):

export function getTask(req, res){
    //console.log(req.params.id);
    let task = tasksServices.getTask(req.params.id);
    if (task)
      res.send(task);
    else
      res.status(404).end();
}

export function getAllTasks(req, res){
  //res.set("Content-Type", "application/json");
  //res.send(JSON.stringify(tasksServices.getAllTasks()));
  res.json(tasksServices.getAllTasks());
}

export function addTask(req, res){
  //console.log(req.body);
  let task = tasksServices.addTask(req.body);
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
  let deleteTask = tasksServices.deleteTask(req.params.id);
  if (deleteTask){
    res.json(deleteTask);
  }
  else{
    res.status(404).end();
  }
}

export function updateTask(req, res){
  let updatedTask = tasksServices.updateTask(req.params.id, req.body);
  if (updatedTask){
    res.json(updatedTask);
  }
  else{
    res.status(404).end();
  }
}

