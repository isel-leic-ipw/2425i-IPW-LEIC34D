import express from 'express';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';
import cors from 'cors';

// Port number for the tests
const PORT = 8000;
let tasksAPI = undefined;
let usersAPI = undefined;

// Import all modules for Dependency Injection:
import tasksApiInit from './web/api/tasks-web-api.mjs';
import usersApiInit from './web/api/users-web-api.mjs';
import taskServicesInit from './services/tasks-services.mjs';
import userServicesInit from './services/users-services.mjs';
//import tasksDataInit from './data/memory/tasks-data-mem.mjs';
import tasksDataInit from './data/elastic/tasks-data-elastic.mjs';
//import usersDataInit from './data/memory/users-data-mem.mjs';
import usersDataInit from './data/elastic/users-data-elastic.mjs';

// Dependency Injection:
try {
  const tasksData = tasksDataInit();
  const usersData = usersDataInit();
  const usersServices = userServicesInit(usersData);
  //const usersServices = userServicesInit();
  const tasksServices = taskServicesInit(tasksData, usersServices);
  tasksAPI = tasksApiInit(tasksServices);
  usersAPI = usersApiInit(usersServices);
}
catch (err) {
  console.error(err);
}

// Init application Express only if tasksAPI and usersAPI were set.
if (tasksAPI && usersAPI){
  // Express function returns an app
  const app = express();
  
  // Load the documentation in the YAML file.
  const swaggerDocument = yaml.load('./docs/tasks-api.yaml');
  
  // Enable the Swagger interface.
  app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  
  // Enable all CORS requests
  app.use(cors());
  
  // Parser the body to JSON
  app.use(express.json());
  
  // Authorize a user by a given token
  app.use("/tasks*", tasksAPI.ensureToken);
  
  // add user
  app.post("/users", usersAPI.addUser);
  
  // get task by id
  app.get("/tasks/:taskId", tasksAPI.getTask);
  
  // list tasks
  app.get("/tasks", tasksAPI.getAllTasks);
  
  // add task
  app.post("/tasks", tasksAPI.addTask);
  
  // delete task by id
  app.delete("/tasks/:taskId?", tasksAPI.deleteTask);
  
  // update task by id
  app.put("/tasks/:taskId?", tasksAPI.updateTask);
  
  // Handling all errors
  app.use(tasksAPI.handlerError);
  
  // App listening...
  app.listen(PORT, () =>
    console.log(`Example app listening on port ${PORT}!`),
  );
}
