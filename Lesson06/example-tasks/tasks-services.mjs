// FUNCTIONS (API Services):

const TASKS = [];
let currentId = TASKS.length;

function nextId(){
  return(currentId++);
}

export function getTask(id){
  return TASKS.find(task => task.id == id);
}

export function getAllTasks(){
  return TASKS;
}

export function addTask(newTask){
  // TODO: verify the body content?
  if (newTask.title && newTask.description){
    let task = {
      id: nextId(),
      title: newTask.title,
      description: newTask.description
    };
    TASKS.push(task);
    return task;
  }
}

export function deleteTask(id){
  let tasks = TASKS;
  let taskIndex = tasks.findIndex(task => task.id == id);
  if (taskIndex != -1){
    let task = tasks[taskIndex];
    // Usage: array.splice(startIndex, deleteCount)
    tasks.splice(taskIndex, 1);
    return(task);
  }
}

export function updateTask(id, newTask){
  let tasks = TASKS;
  let taskIndex = tasks.findIndex(task => task.id == id);
  if (taskIndex != -1){
    tasks[taskIndex].title = newTask.title;
    tasks[taskIndex].description = newTask.description;
    return tasks[taskIndex];
  }
}

