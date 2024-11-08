import * as tasksServices from "../../services/tasks-services.mjs";

// FUNCTIONS (WEB API):
// TODO: need to handle errors properly (in next versions...).

export const getAllTasks = processRequest(local_getAllTasks);
export const getTask = processRequest(local_getTask);
export const addTask = processRequest(local_addTask);
export const updateTask = processRequest(local_updateTask);
export const deleteTask = processRequest(local_deleteTask);

function processRequest(operation){
  return function (req, res){
    const token = getToken(req);
    if (! token){
      res.status(401);
      return res.send({
        code: 3,
        error: "Missing Token"
      });
    }
    req.userToken = token;
    return operation(req, res);
  };
}

function local_getAllTasks(req, res){
  return res.json(tasksServices.getAllTasks(req.userToken));
}

function local_getTask(req, res){
  const taskId = req.params.taskId;
  let task = tasksServices.getTask(taskId, req.userToken);
  if (task)
    return res.json(task);
  else {
    res.status(404);
    return res.send({
      code: 1,
      error: `Task ${taskId} not found.`
    });
  }
}

function local_addTask(req, res){
  let task = tasksServices.addTask(req.body, req.userToken);
  if (task){
    res.status(201);
    return res.send({
      status: `Task ${task.id} was added!`,
      task: task
    });
  }
  else {
    res.status(400);
    res.send({
      code: 2,
      error: `Invalid body or user not found.`
    });
  }
}

function local_deleteTask(req, res){
  const taskId = req.params.taskId;
  let deleteTask = tasksServices.deleteTask(taskId, req.userToken);
  if (deleteTask){
    return res.json({});
  }
  else {
    res.status(404);
    res.send({
      code: 1,
      error: `Task ${taskId} not found.`
    });
  }
}

function local_updateTask(req, res){
  const taskId = req.params.taskId;
  let updatedTask = tasksServices.updateTask(taskId, req.body, req.userToken);
  if (updatedTask){
    return res.json({});
  }
  else {
    res.status(404);
    res.send({
      code: 1,
      error: `Task ${taskId} not found.`
    });
  }
}

// Auxiliary module function
function getToken(req) {
  const authToken = req.get("Authorization");
  if (authToken){
    console.log(authToken);
    const tokenParts = authToken.split(" ");
    if(tokenParts && tokenParts[0] == "Bearer") {
        return tokenParts[1];
    }
  }
}

