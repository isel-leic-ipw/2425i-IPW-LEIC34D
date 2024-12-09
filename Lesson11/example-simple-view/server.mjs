import express from 'express';

//Creates our express server
const app = express();

const PORT = 7000;

// Static files
let cssFile = "styles.css";
let ballImage = "ball.png";

// Serves static files (local images, CSS, JS, ...)
// In the example page, it serves:
// - ball.png
// - styles.css
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
