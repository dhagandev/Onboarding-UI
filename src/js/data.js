const serverHostname = 'localhost';
const serverPort = 8080;
const timelinePath = 'api/1.0/twitter/timeline';

function getTimeline() {
	let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
    	if (xhttp.readyState == xhttp.DONE) {
        	if (xhttp.status == 200) {
                document.getElementById('tweetTable').innerHTML = "";
                handleData(xhttp.responseText);
        	}
        	else {
        		document.getElementById('tweetTable').innerHTML = "An error has occurred. Please contact your administration.";
        	}
        }
        else {
	        document.getElementById('tweetTable').innerHTML = "Retrieving information, please wait!";
        }
    }

    xhttp.open("GET", `http://${serverHostname}:${serverPort}/${timelinePath}`, true);
    xhttp.send();
}

function handleData(data) {
    let dataObj = JSON.parse(data);
    let tweetTable = document.getElementById("tweetTable");

    for (i = 0; i < dataObj.length; i++) {
        let tweetRow = document.createElement("div");
        tweetRow.setAttribute("class", "tweetRow");

        if (i % 2 == 0) {
            tweetRow.style.backgroundColor = "#e8f5fd";
        }
        else {
            tweetRow.style.backgroundColor = "#e9e9e9";
        }

        let obj = dataObj[i];
        let user = obj.user;
        
        let userInfo = createUser(user);
        let tweetInfo = createTweet(obj);

        tweetRow.appendChild(userInfo);
        tweetRow.appendChild(tweetInfo);

        tweetTable.appendChild(tweetRow);
    }

}

function createUser(user) {
    let userInfo = document.createElement("span");
    userInfo.setAttribute("class", "userInfo");

    let userImg = document.createElement("img");
    userImg.src = user.profileImageUrl;

    let userName = document.createTextNode(user.name);
    let userHandle = document.createTextNode(user.twitterHandle);

    userInfo.appendChild(userImg);
    userInfo.appendChild(userName);
    userInfo.appendChild(userHandle);

    return userInfo;
}

function createTweet(obj) {
    let tweetInfo = document.createElement("div");
    tweetInfo.setAttribute("class", "tweetInfo");

    let date = document.createTextNode(new Date(obj.createdAt));
    let message = document.createTextNode(obj.message);
    let link = document.createElement("a");
    link.setAttribute("href", obj.link);
    link.setAttribute("target", "_blank");

    link.appendChild(message);
    tweetInfo.appendChild(date);
    tweetInfo.appendChild(link);

    return tweetInfo;
}