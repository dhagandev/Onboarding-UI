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

    if (document.getElementsByClassName("tweetTable").length == 0) {
        let tweetTable = document.createElement("div");
        tweetTable.setAttribute("class", "tweetTable");
        document.body.appendChild(tweetTable);
    }

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == xhttp.DONE) {
            if (xhttp.status == 200) {
                handleData(xhttp.responseText);
            }
            else {
                errorMessage();
            }
        }
        else {
            waitMessage();
        }
    }

    xhttp.open("GET", `http://${serverHostname}:${serverPort}/${timelinePath}`, true);
    xhttp.send();
}


function errorMessage() {
    let tweetTable = document.getElementsByClassName("tweetTable")[0];
    tweetTable.innerHTML = "";

    let error = document.createElement("div");
    error.setAttribute("class", "error");
    error.innerHTML = "An error has occurred. Please contact your administration.";

    tweetTable.appendChild(error);
}

function waitMessage() {
    let tweetTable = document.getElementsByClassName("tweetTable")[0];
    tweetTable.innerHTML = "";

    let wait = document.createElement("div");
    wait.setAttribute("class", "wait");
    wait.innerHTML = "Retrieving information, please wait!";

    tweetTable.appendChild(wait);
}

function handleData(data) {
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

    let fullDate = new Date(obj.createdAt);
    let parsedDate = month[fullDate.getMonth()] + " " + fullDate.getDate();
    let date = document.createElement("div");
    date.setAttribute("class", "date");
    date.innerHTML = parsedDate;

    let message = document.createElement("div");
    message.setAttribute("class", "message");
    message.innerHTML = obj.message;

    let link = document.createElement("a");
    link.setAttribute("href", obj.link);
    link.setAttribute("target", "_blank");

    link.appendChild(message);
    tweetInfo.appendChild(date);
    tweetInfo.appendChild(link);

    return tweetInfo;
}