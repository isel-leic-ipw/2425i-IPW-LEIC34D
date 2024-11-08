import * as usersServices from './users-services.mjs';
import * as tasksData from '../data/tasks-data-mem.mjs';

// FUNCTIONS (API Services):

export function getTask(taskId, userToken){
  // TODO: need to verify if taskId is a number greater than or equal to 0.
  const userId = usersServices.getUserId(userToken);
  // TODO: need to verify if userId exists.
  const task = tasksData.getTask(taskId);
  // TODO: need to verify if task exists.
  // TODO: need to indicate properly if userId is equal to
  // task.userId.
  if (task && task.userId == userId)
    return task;
}

export function getAllTasks(userToken){
  const userId = usersServices.getUserId(userToken);
  // TODO: need to verify if userId exists.
  return tasksData.getAllTasks(userId);
}

export function addTask(newTask, userToken){
  const userId = usersServices.getUserId(userToken);
  // TODO: need to verify if userId exists.
  // TODO: need to verify newTask content.
  return(tasksData.addTask(newTask, userId));
}

export function deleteTask(idTask, userToken){
  const task = getTask(idTask, userToken);
  if(task)
    return(tasksData.deleteTask(task.id));
}

export function updateTask(idTask, newTask, userToken){
  // TODO: need to verify newTask content.
  const task = getTask(idTask, userToken);
  if (task)
    return (tasksData.updateTask(task.id, newTask));
}
