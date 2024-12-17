import express from 'express';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';
import cors from 'cors';
import hbs from 'hbs';
import path from 'path';
import url from 'url';


// Port number for the tests
const PORT = 8000;

// Paths
const CURRENT_DIR = url.fileURLToPath(new URL('.', import.meta.url));
const PATH_PUBLIC = path.join(CURRENT_DIR, 'web', 'site', 'public');
const PATH_VIEWS = path.join(CURRENT_DIR, 'web', 'site', 'views');
const PATH_PARTIALS = path.join(PATH_VIEWS, 'partials');

console.log(PATH_PUBLIC);

// Variables
let tasksAPI = undefined;
let usersAPI = undefined;
let tasksSite = undefined;

// Import all modules for Dependency Injection:
import tasksApiInit from './web/api/tasks-web-api.mjs';
import usersApiInit from './web/api/users-web-api.mjs';
import taskServicesInit from './services/tasks-services.mjs';
import userServicesInit from './services/users-services.mjs';
import tasksDataInit from './data/memory/tasks-data-mem.mjs';
//import tasksDataInit from './data/elastic/tasks-data-elastic.mjs';
import usersDataInit from './data/memory/users-data-mem.mjs';
//import usersDataInit from './data/elastic/users-data-elastic.mjs';

import tasksSiteInit from './web/site/tasks-web-site.mjs';

// Dependency Injection:
try {
  const tasksData = tasksDataInit();
  const usersData = usersDataInit();
  const usersServices = userServicesInit(usersData);
  //const usersServices = userServicesInit();
  const tasksServices = taskServicesInit(tasksData, usersServices);
  tasksSite = tasksSiteInit(tasksServices);
  tasksAPI = tasksApiInit(tasksServices);
  usersAPI = usersApiInit(usersServices);
}
catch (err) {
  console.error(err);
}

// Init application Express only if tasksAPI and usersAPI were set.
if (tasksAPI && usersAPI && tasksSite){
  // Express function returns an app
  const app = express();
  
  // Serves static files (local images, CSS, JS, ...)
  app.use(express.static(PATH_PUBLIC));

  app.set('views', PATH_VIEWS);

  app.set('view engine', 'hbs');

  hbs.registerPartials(PATH_PARTIALS);

  // Load the documentation API in the YAML file.
  const swaggerDocument = yaml.load(path.join(CURRENT_DIR, 'docs', 'tasks-api.yaml'));
  
  // Enable the Swagger interface for the API.
  app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  
  // Enable all CORS requests for the API
  app.use(cors());
  
  // Parser the body to JSON (API)
  app.use(express.json());

  // Parser the body to URL-encoded (forms in HTML)
  app.use(express.urlencoded({extended: true}));
  
  // Ensure the token user in the header
  // TODO: create a module to include the same functions in both modules.
  app.use("/tasks*", tasksAPI.ensureToken);
  app.use("/site/tasks*", tasksSite.ensureToken);
  
  // add user
  app.post("/users", usersAPI.addUser);
  // TODO: implement web site to register an user (with passport module).
  // app.post("/site/users", usersSite.addUser); ??
  
  // get task by id
  app.get("/tasks/:taskId", tasksAPI.getTask);
  app.get("/site/tasks/:taskId", tasksSite.getTask);
  
  // list tasks
  app.get("/tasks", tasksAPI.getAllTasks);
  app.get("/site/tasks", tasksSite.getAllTasks);
  
  // add task
  app.post("/tasks", tasksAPI.addTask);
  app.post("/site/tasks", tasksSite.addTask);
  
  // delete task by id
  app.delete("/tasks/:taskId?", tasksAPI.deleteTask);
  app.post("/site/tasks/:taskId?/delete", tasksSite.deleteTask);
  
  // update task by id
  app.put("/tasks/:taskId?", tasksAPI.updateTask);
  app.post("/site/tasks/:taskId?/update", tasksSite.updateTask);
  
  // Handling all errors
  app.use("/tasks*", tasksAPI.handlerError);
  app.use("/site*", tasksSite.handlerError);
  
  // App listening...
  app.listen(PORT, () =>
    console.log(`Example app listening on port ${PORT}!`),
  );
}
