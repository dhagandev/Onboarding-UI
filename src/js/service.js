const serverHostname = 'localhost';
const serverPort = 8080;
const timelinePath = 'api/1.0/twitter/timeline';

export const apiGetTimeline = (callback) => {
    let apiUrl = "http://" + serverHostname + ":" + serverPort + "/" + timelinePath;
    fetch(apiUrl)
        .then(res => res.json())
        .then(
            (result) => {
                callback(result, null);
            },
            (error) => {
                callback(null, error);
            }
        );
}