import { errors } from "../../commons/errors.mjs";
import errorToHttp from '../errors-to-http-responses.mjs';

// FUNCTIONS (WEB SITE):

export default function init(tasksServices){

  // Verify the dependencies:
  if(! tasksServices){
    throw errors.INVALID_ARGUMENT('usersServices');
  }

  return {
    ensureToken,
    handlerError,
    getAllTasks: processRequest(local_getAllTasks),
    getTask: processRequest(local_getTask),
    addTask: processRequest(local_addTask),
    updateTask: processRequest(local_updateTask),
    deleteTask: processRequest(local_deleteTask)
  };

  function processRequest(operation){
    return function (req, res, next){

      const opPromise = operation(req, res, next);
      return opPromise.catch(next);
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
    console.log("ERROR (site):", err);
    getResponseError(res, err);
  }

  function getResponseError(res, err){
    const responseError = errorToHttp(err);
    //console.log(responseError.body);
    res.status(responseError.status);
    return res.render("errors-view", responseError.body);
  }

  function local_getAllTasks(req, res){
    const tasksPromise = tasksServices.getAllTasks(req.userToken)
    return tasksPromise.then(tasks => res.render("tasks-view", {tasks, token: req.userToken}));
  }

  function local_getTask(req, res){
    const taskId = req.params.taskId;
    const taskPromise = tasksServices.getTask(taskId, req.userToken);
    return taskPromise.then(task => res.render("task-view", {task, token: req.userToken}));
  }

  function local_addTask(req, res){
    const taskPromise = tasksServices.addTask(req.body, req.userToken);
    return taskPromise.then(task => {
      res.status(201);
      return res.redirect("/site/tasks");
    });
  }

  function local_deleteTask(req, res){
    const taskId = req.params.taskId;
    const deleteTaskPromise = tasksServices.deleteTask(taskId, req.userToken);
    return deleteTaskPromise.then(deleteTask => res.redirect("/site/tasks"));
  }

  function local_updateTask(req, res){
    const taskId = req.params.taskId;
    const newTask = req.body;
    const userToken = req.userToken;
    const updatedTaskPromise = tasksServices.updateTask(taskId, newTask, userToken);
    return updatedTaskPromise.then(updatedTask => res.redirect("/site/tasks"));
  }

  // Auxiliary module function
  function getToken(req) {
    // TODO: add Web site authentication (with passport module, req brings token in the session)
    //return "86130b25-a37e-4f19-9842-549b2fd5bb2c"; // asilva in Elastic DB
    return "b0506867-77c3-4142-9437-1f627deebd67"; // asilva in Memory
  }

}

