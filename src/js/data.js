const serverHostname = 'localhost';
const serverPort = 8080;
const timelinePath = 'api/1.0/twitter/timeline';

function getTimeline() {
	let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
    	if (xhttp.readyState == xhttp.DONE) {
        	if (xhttp.status == 200) {
                document.getElementById('rawJson').innerHTML = "";
                handleData(xhttp.responseText);
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

function handleData(data) {
    let dataObj = JSON.parse(data);
    let tweetTable = document.getElementById("rawJson");

    for (i = 0; i < dataObj.length; i++) {
        let tweetRow = document.createElement("div");
        tweetRow.setAttribute("id", "tweetRow");

        let obj = dataObj[i];
        let user = obj.user;
        
        // Create User
        let userInfo = document.createElement("span");
        userInfo.setAttribute("id", "userInfo");
        let userImg = document.createElement("img");
        userImg.src = user.profileImageUrl;
        let userName = document.createTextNode(user.name);
        let userHandle = document.createTextNode(user.twitterHandle);
        userInfo.appendChild(userImg);
        userInfo.appendChild(userName);
        userInfo.appendChild(userHandle);

        // Create Tweet
        let tweetInfo = document.createElement("div");
        tweetInfo.setAttribute("id", "tweetInfo");
        let date = document.createTextNode(new Date(obj.createdAt));
        let message = document.createTextNode(obj.message);
        let link = document.createElement("a");
        link.setAttribute("href", obj.link);
        link.setAttribute("target", "_blank");
        link.appendChild(message);
        tweetInfo.appendChild(date);
        tweetInfo.appendChild(link);

        tweetRow.appendChild(userInfo);
        tweetRow.appendChild(tweetInfo);

        tweetTable.appendChild(tweetRow);
    }

}