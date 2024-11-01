import * as usersServices from './users-services.mjs';

// FUNCTIONS (API Services):
const NUM_TASKS = 10;

// Initial array for tests:
const TASKS = new Array(NUM_TASKS)
                .fill(0).map((v, idx) => { 
                    return { 
                        id: idx, 
                        name: `Task ${idx}`, 
                        description: `Task ${idx} description`,
                        userId: (idx % 2 + 1) // user 1 or 2
                     }
                });

let currentId = TASKS.length;

function nextId(){
  return(currentId++);
}

export function getTask(taskId, userToken){
  const userId = usersServices.getUserId(userToken);
  const task = TASKS.find(
    task => (task.id == taskId && task.userId == userId)
  );
  return task;
}

export function getAllTasks(userToken){
  console.log(TASKS);
  const userId = usersServices.getUserId(userToken);
  console.log(userId, userToken);
  return TASKS.filter(task => task.userId == userId);
}

export function addTask(newTask, userToken){
  const userId = usersServices.getUserId(userToken);
  let task = {
    id: nextId(),
    title: newTask.title,
    description: newTask.description,
    userId: userId
  }
  TASKS.push(task);
  return task;
}

export function deleteTask(idTask, userToken){
  let tasks = TASKS;
  const userId = usersServices.getUserId(userToken);
  let taskIndex = tasks.findIndex(
      task => (task.id == idTask && task.userId == userId)
    );
  if (taskIndex != -1){
    let task = tasks[taskIndex];
    // Usage: array.splice(startIndex, deleteCount)
    tasks.splice(taskIndex, 1);
    return(task);
  }
}

export function updateTask(idTask, newTask, userToken){
  let tasks = TASKS;
  const userId = usersServices.getUserId(userToken);
  let taskIndex = tasks.findIndex(
    task => (task.id == idTask && task.userId == userId)
  );
  if (taskIndex != -1){
    tasks[taskIndex].title = newTask.title;
    tasks[taskIndex].description = newTask.description;
    return tasks[taskIndex];
  }
}

