const serverHostname = 'localhost';
const serverPort = 8080;
const timelinePath = 'api/1.0/twitter/timeline';

function getTimeline() {
	let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
    	if (xhttp.readyState == xhttp.DONE) {
        	if (xhttp.status == 200) {
        		document.getElementById('rawJson').innerHTML = xhttp.responseText;
        	}
        	else {
        		document.getElementById('rawJson').innerHTML = "An error has occurred. Please contact your administration.";
        	}
        }
        else {
	        document.getElementById('rawJson').innerHTML = "Retrieving information, please wait!";
        }
    }

    xhttp.open("GET", `http://${serverHostname}:${serverPort}/${timelinePath}`, true);
    xhttp.send();
}

document.addEventListener('DOMContentLoaded', getTimeline());