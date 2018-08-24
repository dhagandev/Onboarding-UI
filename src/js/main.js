import {run} from './reactRenderComponents.js';
const hostname = '127.0.0.1';
const port = 9000;

console.log(`Server running at http://${hostname}:${port}/`);

window.onload = () => {
    run();
}