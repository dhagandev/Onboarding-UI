const fs = require('fs');
const express = require('express');
const hostname = '127.0.0.1';
const port = 9000;

let app = express();

app.get('/', (request, response) => {
	response.set('Content-Type', 'text/html');
    fs.readFile('./src/index.html', function (err, html) {
	    if (err) throw err;
   		response.send(html);
	});
});

app.get('/js/data.js', (request, response) => {
	response.set('Content-Type', 'text/javascript');
	fs.readFile('./src/js/data.js', function (err, js) {
	    if (err) throw err;
   		response.send(js);
	});
});

app.get('/general.css', (request, response) => {
	response.set('Content-Type', 'text/css');
	fs.readFile('./src/css/general.css', function (err, styles) {
	    if (err) throw err;
   		response.send(styles);
	});
});

app.get('/header.css', (request, response) => {
	response.set('Content-Type', 'text/css');
	fs.readFile('./src/css/header.css', function (err, styles) {
	    if (err) throw err;
   		response.send(styles);
	});
});

app.get('/timeline.css', (request, response) => {
	response.set('Content-Type', 'text/css');
	fs.readFile('./src/css/timeline.css', function (err, styles) {
	    if (err) throw err;
   		response.send(styles);
	});
});

app.get('/wait.css', (request, response) => {
	response.set('Content-Type', 'text/css');
	fs.readFile('./src/css/wait.css', function (err, styles) {
	    if (err) throw err;
   		response.send(styles);
	});
});

app.get('/error.css', (request, response) => {
	response.set('Content-Type', 'text/css');
	fs.readFile('./src/css/error.css', function (err, styles) {
	    if (err) throw err;
   		response.send(styles);
	});
});

app.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});