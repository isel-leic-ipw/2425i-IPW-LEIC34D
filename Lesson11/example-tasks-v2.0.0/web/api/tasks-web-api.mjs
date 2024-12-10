import { errors } from "../../commons/errors.mjs";
//import * as tasksServices from "../../services/tasks-services.mjs";
import {errorToHttp} from '../errors-to-http-responses.mjs';

// FUNCTIONS (WEB API):

export default function init(tasksServices){

  // Verify the dependencies:
  if(! tasksServices){
    throw errors.INVALID_ARGUMENT('usersServices');
  }

  return {
    ensureToken,
    handlerError,
    /*getAllTasks: local_getAllTasks,
    getTask: local_getTask,
    addTask: local_addTask,
    updateTask: local_updateTask,
    deleteTask: local_deleteTask*/
    getAllTasks: processRequest(local_getAllTasks),
    getTask: processRequest(local_getTask),
    addTask: processRequest(local_addTask),
    updateTask: processRequest(local_updateTask),
    deleteTask: processRequest(local_deleteTask)
  };

  function processRequest(operation){
    return function (req, res, next){
      return operation(req, res, next)
      .catch(next);
    }
  }

  function ensureToken(req, res, next){
      const token = getToken(req);
      //console.log("Token:", token);
      if (token){
        req.userToken = token;
        next();
      }
      else {
        next(errors.MISSING_TOKEN());
      }
  }

  function handlerError (err, req, res, next) {
    console.log("ERROR:", err);
    getResponseError(res, err);
  }

  function getResponseError(res, err){
    //console.log(err);
    const responseError = errorToHttp(err);
    res.status(responseError.status);
    return res.json(responseError.body); 
  }

  function local_getAllTasks(req, res){
    const tasksPromise = tasksServices.getAllTasks(req.userToken)
    return tasksPromise.then(tasks => res.json(tasks));
  }

  function local_getTask(req, res){
    const taskId = req.params.taskId;
    const taskPromise = tasksServices.getTask(taskId, req.userToken);
    return taskPromise.then(task => res.json(task));
  }

  function local_addTask(req, res){
    const taskPromise = tasksServices.addTask(req.body, req.userToken);
    return taskPromise.then(task => {
      res.status(201);
      return res.send({
        status: `Task ${task.id} was added!`,
        task: task
      });
    });
  }

  function local_deleteTask(req, res){
    const taskId = req.params.taskId;
    const deleteTaskPromise = tasksServices.deleteTask(taskId, req.userToken);
    return deleteTaskPromise.then(
      deleteTask => res.json({})
    );
  }

  function local_updateTask(req, res){
    const taskId = req.params.taskId;
    const newTask = req.body;
    const userToken = req.userToken;
    const updatedTaskPromise = tasksServices.updateTask(taskId, newTask, userToken);
    return updatedTaskPromise.then(
      updatedTask => res.json({})
    );
  }

  // Auxiliary module function
  function getToken(req) {
    const authToken = req.get("Authorization");
    if (authToken){
      //console.log(authToken);
      const tokenParts = authToken.split(" ");
      if(tokenParts && tokenParts[0] == "Bearer") {
          return tokenParts[1];
      }
    }
  }

}

