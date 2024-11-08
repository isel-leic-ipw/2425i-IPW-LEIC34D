// The task data in memory:

const NUM_TASKS = 10;

// Initial array for tests:
const TASKS = new Array(NUM_TASKS)
    .fill(0).map((v, idx) => {
        return {
            id: idx,
            title: `Task ${idx}`,
            description: `Task ${idx} description`,
            userId: (idx % 2 + 1) // user 1 or 2
        }
    });

let currentId = TASKS.length;

// FUNCTIONS (Tasks API Data):

function nextTaskId() {
    return (currentId++);
}

function aTask(newTask, id, userId) {
    this.id = id;
    this.title = newTask.title;
    this.description = newTask.description;
    this.userId = userId;
}

export function verifyNewTaskProperties(newTask) {
    // Only title is mandatory.
    console.log(newTask.title);
    if (newTask.title) return true;
    else return false;
}

export function getTask(taskId) {
    const task = TASKS.find(task => (task.id == taskId));
    return task;
}

export function getAllTasks(userId) {
    return TASKS.filter(task => task.userId == userId);
}

export function addTask(newTask, userId) {
    let task = new aTask(newTask, nextTaskId(), userId);
    TASKS.push(task);
    return task;
}

export function deleteTask(idTask) {
    let taskIndex = TASKS.findIndex(task => (task.id == idTask));
    if (taskIndex != -1) {
        let task = TASKS[taskIndex];
        // Usage: array.splice(startIndex, deleteCount)
        TASKS.splice(taskIndex, 1);
        return (task);
    }
}

export function updateTask(idTask, newTask) {
    let taskIndex = TASKS.findIndex(task => (task.id == idTask));
    if (taskIndex != -1) {
        TASKS[taskIndex].title = newTask.title;
        TASKS[taskIndex].description = newTask.description;
        return TASKS[taskIndex];
    }
}

