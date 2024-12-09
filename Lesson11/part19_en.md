# Template Engine with Express

- A **template engine** enables the use of static template files in the Express application.
- Template files are used to define HTML templates.
    - They allow include variables.
- Template engine replaces variables in a template file with actual values, and transforms the template into an HTML file.
- Examples of template engines:
    - [Handlebars](https://www.npmjs.com/package/hbs),
    - [EJS](https://www.npmjs.com/package/ejs),
    - [Pugs](https://pugjs.org/api/getting-started.html).

## Static Files

- Static files are files such as images, CSS, Javascript, and static HTML.
- To serve static files use the `express.static` built-in middleware function in Express.
- Syntax:
    ```javascript
    express.static(root, [options])
    ```
- Example (available at: [example-simple-view/](example-simple-view/)):
    ```javascript
    import express from 'express';

    //Creates our express server
    const app = express();

    const PORT = 7000;

    // Static files
    let cssFile = "styles.css";
    let ballImage = "ball.png";

    // Serves static files (local images, CSS, JS, ...)
    app.use(express.static('public'));

    // Sets a basic route
    app.get('/', sendHTML);

    // Makes the app listen to port
    app.listen(PORT, () => console.log(`App listening in http://localhost:${PORT}`));

    function sendHTML(req, res){
        res.set('Content-type', "text/html");
        // It is a very simple way to send an HTML content:
        res.send(`
            <!DOCTYPE html>
            <html>
                <head>
                    <link href="${cssFile}" rel="stylesheet" type="text/css">
                </head>
                <body>
                    <h1> Example page </h1>
                    <div>
                        <p>First paragraph</p>
                        <p>Second paragraph</p>
                    </div>
                    <img src="${ballImage}" width=100px> </img>
                </body>
            </html>
            `
        );
    }
    ```

## Handlebars

- Handlebars is a simple templating language.
- It uses a **template** and an input **object** to generate HTML or other text formats.
- Documentation: https://handlebarsjs.com/guide/
- A handlebars expression is wrapped by the placeholders `{{` and `}}`.
- When the template is executed, these expressions are replaced with values from an input **object**.
- For example, this handlebar:
    ```hbs
    <p>{{firstname}} {{lastname}}</p>
    ```
- When the following object is applied as input:
    ```javascript
    {
        firstname: "Ana",
        lastname: "Silva",
    }
- This produces:
    ```html
    <p>Ana Silva</p>
    ```

### HTML-escaping

- The values returned by the `{{expression}}` are HTML-escaped.
    - Characters such as `&`, `<`, `>`, `\"`, `'`, and `=`, are escaped to `&amp;`, `&lt;`, `&gt;`, `&quot;`, `&#x27;`, and `&#x3D;`.
- `{{{expression}}}` (with triple-braces) allows not escape this characters.

### Partials

- Allows to reuse templates.
- A main template can be divided in parts (partials).
- A partial called *myPartial* is referenced in a template by:
    ```hbs
    {{> myPartial}}
    ```
- Example of main template:
    ```html
    <!DOCTYPE html> 
    <html> 
    <head> 
        <title>Handlebars Demo</title>
    </head> 
    <body> 
        <div class="container-fluid">
            {{> header}}

            {{> content}}

            {{> footer}}
        </div>
    </body> 
    </html>
- The `header` partial is:
    ```html
    <h1> Title of the Web Page </h1>
    ```
- The `content` partial is:
    ```html
    <div> 
        This is the content of the Web page...
    </div>
    ```
- The `footer` partial is:
    ```html
    <footer> 
        The footer...
    </footer>
    ```

### Helpers

- Helpers can be used to implement functionality that is not part of the Handlebars language itself.
- A helper can be registered at runtime via `Handlebars.registerHelper` in the program.
- For example, register a function to uppercase a string:
    ```javascript
    Handlebars.registerHelper('upperCase', function (aString) {
        return aString.toUpperCase();
    });
    ```
- Then, in the HTML view file, we can use:
    ```handlebars
    <p> {{firstname}} {{upperCase lastname}} </p>
    ```
- This produces:
    ```html
    <p>Ana SILVA</p>
    ```

### Built-in Helpers

- Here, there are some useful built-in helpers for Handlebars.
    - For more, consult the [documentation](https://handlebarsjs.com/guide/builtin-helpers.html).

#### #if

- The **if** helper conditionally render a block. 
- False condition is related to `false`, `undefined`, `null`, `""`, `0`, or `[]`.
- This helper can be used with **else** section.

- Handlebars example:
    ```hbs
    <div class="entry">
        {{#if author}}
            <h1>{{firstName}} {{lastName}}</h1>
        {{else}}
            <h1>Unknown author</h1>
        {{/if}}
    </div>
    ```
- Input example:
    ```javascript
    {
        author: true,
        firstName: "Ana",
        lastName: "Silva",
    }
- Output:
    ```html
    <div class="entry">
        <h1>Ana Silva</h1>
    </div>
    ```

#### #each

- Used to iterate over a list or object.
- Inside the block each, the `this` can be used to reference the element being iterated over.
- `@index` returns the index list.
- `@key` returns the key object.

- Example with list:
    - Handlebars:
        ```hbs
        <ul class="people_list">
        {{#each people}}
            <li>{{this}}</li>
        {{/each}}
        </ul>
        ```
    - Input:
        ```javascript
        {
            people: [
                "Ana Silva",
                "Paulo Nunes",
                "Maria Pereira",
            ],
        }
    - Output:
        ```html
        <ul class="people_list">
            <li>Ana Silva</li>
            <li>Paulo Nunes</li>
            <li>Maria Pereira</li>
        </ul>
        ```
- Example with object:
    - Handlebars:
        ```hbs
        <table>
        {{#each user}}  
            <tr> 
                <td> {{@key}}:  </td> 
                <td> {{this}}   </td>
            </tr>
        {{/each}}
        <table>
        ```
    - Input:
        ```javascript
        {
            user: {name: "Ana", surname: "Silva"},
        }
    - Output:
        ```html
        <table>
            <tr> 
                <td> name: </td> 
                <td> Ana </td> 
            </tr>
            <tr> 
                <td> surname: </td>
                <td> Silva </td> 
            </tr>
        <table>
        ```

#### #with

- The with-helper changes the evaluation context of template-part.
- Handlebars example:
    ```hbs
    {{#with person}}
        <p>{{firstname}} {{lastname}}</p>
    {{/with}}
    ```
- Input example:
    ```javascript
    {
        person: {
            firstName: "Ana",
            lastName: "Silva",
        },
    }
- Output:
    ```html
    <p> Ana Silva </p>
    ```

## Handlebars with Express HBS

- We will use HBS module for using handlebars.
    - It is an Express.js view engine for Handlebars.
    - https://www.npmjs.com/package/hbs
-  
- Install using npm:
    ```bash
    npm install hbs
    ```

- To render template files, set the following application setting properties, in the default `server_app.mjs` created by the generator:
    - `views`, the directory where the template files are located.
        - This defaults to the views directory in the application root directory.
    - `view engine`, the template engine to use. 
        - For HBS: `app.set('view engine', 'hbs')`
- Example:
    ```javascript
    import hbs from 'hbs';
    import path from 'path';
    import url from 'url';

    const CURRENT_DIR = url.fileURLToPath(new URL('.', import.meta.url));
    const PATH_VIEWS = path.join(CURRENT_DIR, 'views');

    app.set('views', PATH_VIEWS);
    app.set('view engine', 'hbs');
    ```
    - Notes:
        - `url` module is used to define the current directory.
        - The method `join` of the module `path` concatenates the path names with the properly separator string.

### Organization of Files

- **public**: static files such as images, CSS, and Javascript (client side).
- **views**: template files used to represent document layouts in HTML using handlebars.
    - **partials**: handlebars files with partials templates.
- Directory structure:

    ```tree
    └── site/
        ├── public/
        └── views/
            └── partials/
    ```

### Partials Directory Registration

- In the application server, register the path to the partials files:
    ```javascript
    const PATH_PARTIALS = path.join(PATH_VIEWS, 'partials');

    hbs.registerPartials(PATH_PARTIALS);
    ```
- Then, the server knows how to find the partials when the name is informed.
    - Partials files has `.hbs` extension.
    - Partials file names, without the extension, must be the same as the names used in the templates.

### HTML Render

- There is a function `render` for the response object.
- Once an express **route** is registered, the `render` function can be called to show a model view.
- Example:
    ```javascript
    // ...
    // Route:
    app.get('/', home);
    // ...

    // Home function associated to the home.hbs
    function home(req, res){
        res.render('home', {
            user: {name: "Ana", surname: "Silva"},
        });
    }    
    ```
- Home HBS file:
    ```html
    <!DOCTYPE html> 
    <html> 
    <head> 
        <title>Handlebars Demo</title>
    </head> 
    <body> 
    <section>

        <!-- For loop demo with key -->
        <table>
        {{#each user}}  
        <tr>
            <td> {{@key}}: </td> 
            <td> {{this}} </td>
        </tr>
        {{/each}}
        <table>

    </section>
    </body> 
    </html>
    ```
### Partials

- Header in `partials/header.hbs`:
    ```hbs
    <header>   
        <h1>{{content.title}}</h1>
        <h3>{{content.message}}</h3> 
    </header>
    ```
- Content `partials/content.hbs`:
    ```hbs
    <section>
        <!-- For loop demo with index -->
        {{#each content.array}}  
            <p>{{@index}}: {{this}}</p> 
        {{/each}} 
    </section> 
    ```
- Footer in `partials/footer.hbs`:
    ```hbs
    <footer>
        The footer...
    </footer>
    ```
- Main layout in `home.hbs`:
    ```hbs
    <!DOCTYPE html> 
    <html> 
    <head> 
        <title>Handlebars Demo</title>
    <link href={{cssFile}} rel="stylesheet" type="text/css">
    <!-- <link href="styles.css" rel="stylesheet" type="text/css"> -->
    </head> 
    <body> 
    <div class="container-fluid">
        {{> header}}

        {{> content}}

        <!-- For loop demo with key -->
        <table>
        {{#each user}}  
        <tr> 
            <!-- Uses firstUpperCase register Helper -->
            <td> {{firstUpperCase @key}}: </td> 
            <td> {{this}} </td>
        </tr>
        {{/each}}
        <table>
        
        <br>
        {{{articleHtmlWithoutEscape}}}

        <a href="/form-cars">Go to form cars</a>

        {{> footer}}
    </div>
    </body> 
    </html>
    ```

- Express module with views, partials and a helper register example:
    ```javascript
    import express from 'express';
    import hbs from 'hbs';
    import path from 'path';
    import url from 'url';

    //Creates our express server
    const app = express();

    // Constants
    const PORT = 7000;
    const CURRENT_DIR = url.fileURLToPath(new URL('.', import.meta.url));
    const PATH_PUBLIC = path.join(CURRENT_DIR, 'public');
    const PATH_VIEWS = path.join(CURRENT_DIR, 'views');
    const PATH_PARTIALS = path.join(PATH_VIEWS, 'partials');

    // Static files
    let cssFile = 'styles.css';

    // Serves static files (local images, CSS, JS, ...)
    app.use(express.static(PATH_PUBLIC));

    // Set the views path
    app.set('views', PATH_VIEWS);

    // Set HBS as view engine
    app.set('view engine', 'hbs');

    // Register partials HBS directory
    hbs.registerPartials(PATH_PARTIALS);

    // Register my helper firstUpperCaseFunc
    hbs.registerHelper('firstUpperCase', firstUpperCaseFunc);

    // Set a basic route
    app.get('/', home);

    // Make the app listen to port
    app.listen(PORT, () => console.log(`App listening in http://localhost:${PORT}`));

    // Home function associated to the home.hbs
    function home(req, res){
        res.render('home', {
            cssFile,
            articleHtmlWithoutEscape: "<article> Article text example. </article>",
            content: {
                title: "Example Web Site",
                array: ["element 0", "element 1", "element 2"],
                message: "Hi!"
            },
            user: {name: "Ana", surname: "Silva"},
        });
    }

    // My helper
    function firstUpperCaseFunc(str) {
        return str[0].toUpperCase() + str.slice(1);
    }
    ```
#### Forms

- Inclusion of the routes in the server:
    ```javascript
    app.use(express.urlencoded({ extended: true }));
    app.get('/form-cars', formCars); // for the form view
    app.post('/cars', carsChoice); // for the post form

    function formCars(req, res){
        res.render('form-view', {
            carList: ["Volvo", "Opel", "Fiat"],
        });   
    }

    function carsChoice(req, res){
        console.log('Car choice:', req.body);
        res.redirect("/");
    }
    ```

- Inclusion of the view `form-view.hbs`:
    ```hbs
    <!DOCTYPE html> 
    <html> 
    <head> 
        <title>Handlebars Demo</title>
        <link href="styles.css" rel="stylesheet" type="text/css">
    </head> 
    <body> 
        <section class="container-fluid">
            {{> header}}

            {{> form}}

            {{> footer}}
        </section>
    </body> 
    </html> 
    ```

- Inclusion of the `form.hbs` in partials:
    ```hbs
    <section>
        <form action="/cars" method="POST">
            <h3> Form Cars: </h3>
            <label for="fname">Firstname:</label>
            <input type="text" id="fname" name="fname" required>
            <br><br>
            <label for="cars">Choose a car:</label>
            <select name="cars" id="cars" required>
                {{#each carList}}
                    <option value="{{this}}">{{this}}</option>
                {{/each}}
            </select>
            <br><br>
            <input type="submit" value="Submit">
        </form>
    </section> 
    ```

#### Code

- This simple miscellaneous project is available at: [example-simple-view/](example-simple-view/)

### Use Case: Tasks Web Site

- Directory structure:
    ```tree
    └── web/
        └── site/
            ├── public/
            └── views/
                └── partials/
    ```

- New module `tasks-web-site.mjs` in `web/site/`.
    - With dependency injection.
    - Server inits this module as `tasksSite`, with dependency of `tasksServices` module.

- New Express routes in `/site`.
    ```javascript
    app.get("/site/tasks/:taskId", tasksSite.getTask);
    app.get("/site/tasks", tasksSite.getAllTasks);
    app.post("/site/tasks", tasksSite.addTask);
    app.post("/site/tasks/:taskId/delete", tasksSite.deleteTask);
    app.post("/site/tasks/:taskId/update", tasksSite.updateTask);
    ```
- Notes:
    - For DELETE and PUT methods, use POST because of the forms.
        - Forms in HTML only implements GET and POST methods for submission.

#### Views and Partials

#### Layout

- A file `layout.hbs`, in `views/` directory, works as a layout for all pages.
    - The HTML-escape `{{{body}}}` is replaced by the view indicated in Express.
- Example with Bootstrap:
    ```hbs
    <!DOCTYPE html> 
    <html> 
        <head> 
            <title>Tasks Web Site</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        </head> 
        <body> 
            {{{body}}}
        </body> 
    </html>
    ```

#### Tasks Web Site Code

- The Tasks Web Site project is available at: []() 