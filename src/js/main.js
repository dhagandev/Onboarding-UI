const data = require('./data.js');
const reactRenderComponents = require('./reactRenderComponents.js');
const hostname = '127.0.0.1';
const port = 9000;

console.log(`Server running at http://${hostname}:${port}/`);

window.onload = () => {
    let timelineBtn = document.getElementById("timelineButton");
    if (timelineBtn != null) {
        timelineButton.onclick = () => data.getTimeline();
    }
    console.log(timelineBtn);
    window.onload = reactRenderComponents.run();
    data.getTimeline();
}