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

//console.log(CURRENT_DIR);

// Static files
let cssFile = 'styles.css';

// Serves static files (local images, CSS, JS, ...)
app.use(express.static(PATH_PUBLIC));

// Set the views path
app.set('views', PATH_VIEWS);

app.set('view engine', 'hbs');

//console.log(PATH_PARTIALS);

// Register partials HBS directory
hbs.registerPartials(PATH_PARTIALS);

// Register my helper firstUpperCaseFunc
hbs.registerHelper('firstUpperCase', firstUpperCaseFunc);

app.use(express.urlencoded({ extended: true })); 

// Sets a basic route
app.get('/', home);

app.get('/form-cars', formCars);

app.post('/cars', carsChoice);

// Makes the app listen to port
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
        carList: ["Volvo", "Opel", "Fiat"],
    });
}

function formCars(req, res){
    res.render('form-view', {
        carList: ["Volvo", "Opel", "Fiat"],
    });   
}

function carsChoice(req, res){
    console.log('Car choice:', req.body);
    res.redirect("/");
}

// My helper
function firstUpperCaseFunc(str) {
    return str[0].toUpperCase() + str.slice(1);
}