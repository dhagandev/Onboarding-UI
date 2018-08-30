const serverHostname = 'localhost';
const serverPort = 8080;
const timelinePath = 'api/1.0/twitter/timeline';

export const apiGetTimeline = () => {
    let apiUrl = `http://${serverHostname}:${serverPort}/${timelinePath}`;
    return fetch(apiUrl).then(res => res.json());
}