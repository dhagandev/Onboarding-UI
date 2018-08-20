import fs from 'fs';
import express from 'express';
const hostname = '127.0.0.1';
const port = 9000;

let app = express();

app.get('/', (request, response) => {
    response.set('Content-Type', 'text/html');
    fs.readFile('./src/index.html', (err, html) => {
        if (err) throw err;
        response.send(html);
    });
});

app.get('/js/data.js', (request, response) => {
    response.set('Content-Type', 'text/javascript');
    fs.readFile('./src/js/data.js', (err, js) => {
        if (err) throw err;
        response.send(js);
    });
});

app.get('/styles.css', (request, response) => {
    response.set('Content-Type', 'text/css');
    fs.readFile('./src/css/styles.css', (err, styles) => {
        if (err) throw err;
        response.send(styles);
    });
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});