const http = require('http');
const fs = require('fs');
const hostname = '127.0.0.1';
const port = 9000;

const cors = require('cors');
const express = require('express');

let app = express();
app.use(cors());

app.get('/', (request, response) => {
	response.set('Content-Type', 'text/html');
    fs.readFile('./src/index.html', function (err, html) {
	    if (err) throw err;
   		response.send(html);
	});
});

app.get('/js/data.js', (request, response) => {
	response.set('Content-Type', 'text/html');
	fs.readFile('./src/js/data.js', function (err, js) {
	    if (err) throw err;
   		response.send(js);
	});
});

app.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});