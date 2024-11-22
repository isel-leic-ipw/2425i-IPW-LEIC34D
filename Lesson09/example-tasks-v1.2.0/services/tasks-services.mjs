import * as usersServices from './users-services.mjs';
import * as tasksData from '../data/elastic/tasks-data-elastic.mjs';
import { errors } from '../commons/errors.mjs';

// FUNCTIONS (API Services):

export function getTask(taskId, userToken){

  if (! taskId)
    return Promise.reject(errors.MISSING_PARAMETER());

  // if (! Number(taskId))
  //  return Promise.reject(errors.INVALID_PARAMETER("taskId"));

  const taskPromise = Promise.all([
    usersServices.getUserId(userToken), 
    tasksData.getTask(taskId)
  ]);

  return taskPromise.then( arrayValues => {
    const userId = arrayValues[0];
    const task = arrayValues[1];
    if (! task){
      return Promise.reject(errors.TASK_NOT_FOUND(taskId));
    }

    if (task.userId == userId){
      return (task);
    }
    else {
      const error = errors.NOT_AUTHORIZED(`User ${userId}`, `Task ${task.id}`);
      return Promise.reject(error);
    }
  });
}

export function getAllTasks(userToken){
  return usersServices.getUserId(userToken)
    .then(userId => tasksData.getAllTasks(userId));
}

export function addTask(newTask, userToken){
  return usersServices.getUserId(userToken)
    .then(userId => {
      if (! tasksData.verifyNewTaskProperties(newTask))
        return Promise.reject(errors.INVALID_BODY("new Task"));    
      return tasksData.addTask(newTask, userId);
    });
}

export function deleteTask(taskId, userToken){
  // Do the same as getTask, then delete the task.
  return getTask(taskId, userToken)
    .then((task) => {
        if (! task)
          return Promise.reject(errors.TASK_NOT_FOUND(taskId));
        return task.id;
      })
    .then(tasksData.deleteTask);
}

export function updateTask(taskId, newTask, userToken){
  // Do the same as getTask, then update the task.
  return getTask(taskId, userToken)
    .then((task) => {
      if (! task)
        return Promise.reject(errors.TASK_NOT_FOUND(taskId));
      if (! tasksData.verifyNewTaskProperties(newTask))
        return Promise.reject(errors.INVALID_BODY("new Task"));  
      newTask.userId = task.userId;
      return tasksData.updateTask(task.id, newTask);
    });
}
