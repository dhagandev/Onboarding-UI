const serverHostname = 'localhost';
const serverPort = 8080;
const timelinePath = 'api/1.0/twitter/timeline';

function getTimeline() {
	let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
    	if (xhttp.readyState == xhttp.DONE) {
        	let raw = xhttp.responseText;
        	if (raw == "") {
        		raw = "An error has occurred. Please contact your administration.";
        	}
            document.getElementById('rawJson').innerHTML = raw;
        }
        else {
        	console.log("xhttpProcess " + xhttp.readyState);
        	document.getElementById('rawJson').innerHTML = "Retrieving information, please wait!";
        }
    }

    xhttp.open("GET", `http://${serverHostname}:${serverPort}/${timelinePath}`, true);
    xhttp.send();
}