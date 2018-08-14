const serverHostname = 'localhost';
const serverPort = 8080;
const timelinePath = 'api/1.0/twitter/timeline';

const month = new Array();
month[0] = "Jan";
month[1] = "Feb";
month[2] = "Mar";
month[3] = "Apr";
month[4] = "May";
month[5] = "Jun";
month[6] = "Jul";
month[7] = "Aug";
month[8] = "Sep";
month[9] = "Oct";
month[10] = "Nov";
month[11] = "Dec";

function getTimeline() {
	let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
    	if (xhttp.readyState == xhttp.DONE) {
        	if (xhttp.status == 200) {
                document.getElementsByClassName("tweetTable").innerHTML = "";
                handleData(xhttp.responseText);
        	}
        	else {
                console.log("An error has occurred. Please contact your administration. " + xhttp.status);
        		document.getElementsByClassName("tweetTable").innerHTML = "An error has occurred. Please contact your administration.";
        	}
        }
        else {
            console.log("Retrieving information, please wait! " + xhttp.readyState);
	        document.getElementsByClassName("tweetTable").innerHTML = "Retrieving information, please wait!";
        }
    }

    xhttp.open("GET", `http://${serverHostname}:${serverPort}/${timelinePath}`, true);
    xhttp.send();
}

function handleData(data) {
    console.log("Handling data");
    let dataObj = JSON.parse(data);
    let tweetTable = document.getElementsByClassName("tweetTable")[0];
    tweetTable.innerHTML = "";

    for (i = 0; i < dataObj.length; i++) {
        let tweetRow = document.createElement("div");
        tweetRow.setAttribute("class", "tweetRow");

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
    let userInfo = document.createElement("div");
    userInfo.setAttribute("class", "userInfo");

    let userImg = document.createElement("img");
    userImg.setAttribute("class", "userImg");
    userImg.src = user.profileImageUrl;

    let userName = document.createElement("div");
    userName.setAttribute("class", "userName");
    userName.innerHTML = user.name;

    let userHandle = document.createElement("div");
    userHandle.setAttribute("class", "userHandle");
    userHandle.innerHTML = user.twitterHandle;

    userInfo.appendChild(userImg);
    userInfo.appendChild(userName);
    userInfo.appendChild(userHandle);

    return userInfo;
}

function createTweet(obj) {
    let tweetInfo = document.createElement("div");
    tweetInfo.setAttribute("class", "tweetInfo");
    tweetInfo.setAttribute("onclick", "window.open('" + obj.link + "', '_blank');");

    let fullDate = new Date(obj.createdAt);
    let parsedDate = month[fullDate.getMonth()] + " " + fullDate.getDate();
    let date = document.createElement("div");
    date.setAttribute("class", "date");
    date.innerHTML = parsedDate;

    let message = document.createElement("div");
    message.setAttribute("class", "message");
    message.innerHTML = obj.message;

    tweetInfo.appendChild(date);
    tweetInfo.appendChild(message);

    return tweetInfo;
}