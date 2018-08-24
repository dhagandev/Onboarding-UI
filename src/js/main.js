import {getTimeline} from './data.js';
import {run} from './reactRenderComponents.js';
const hostname = '127.0.0.1';
const port = 9000;

console.log(`Server running at http://${hostname}:${port}/`);

window.onload = () => {
    let timelineBtn = document.getElementById("timelineButton");
    if (timelineBtn != null) {
        console.log("Timeline Button exists.");
        // timelineButton.onclick = () => run();
    }
    run();
}