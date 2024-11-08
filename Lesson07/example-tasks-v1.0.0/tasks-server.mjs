import express from 'express';
import * as tasksAPI from './web/api/tasks-web-api.mjs';
import * as usersAPI from './web/api/users-web-api.mjs';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';

const PORT = 8000;  // Port number for the tests
const app = express(); // Express function returns an app

const swaggerDocument = yaml.load('./docs/tasks-api.yaml');

app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Parser the body to JSON
app.use(express.json());

// add user
app.post("/users", usersAPI.addUser);

// Authorize a user by a given token
//app.use("/tasks*", tasksAPI.authorize);

// get task by id
app.get("/tasks/:taskId", tasksAPI.getTask);

// list tasks
app.get("/tasks", tasksAPI.getAllTasks);

// add task
app.post("/tasks", tasksAPI.addTask);

// delete task by id
app.delete("/tasks/:taskId", tasksAPI.deleteTask);

// update task by id
app.put("/tasks/:taskId", tasksAPI.updateTask);

// App listening...
app.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`),
);
