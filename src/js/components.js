import React from 'react';

const serverHostname = 'localhost';
const serverPort = 8080;
const timelinePath = 'api/1.0/twitter/timeline';
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const create = React.createElement;

export class HeaderComponent extends React.Component {
    render() {
        return create(
            "div",
            {key: "header", className: "header"},
            [
                create(
                    "div",
                    {key: "labHeader", id: "labHeader"},
                    "Lab for Dana"
                ),
                create(
                    "button",
                    {
                        key: "timelineButton",
                        id: "timelineButton", 
                        className: "button"
                    },
                    "Get Timeline"
                )
            ]
        );
    }
}

export class TimelineTableComponent extends React.Component {
    constructor() {
        super()
        this.state = {
            data: null,
            error: null
        }
    }

    componentDidMount() {
        let apiUrl = "http://" + serverHostname + ":" + serverPort + "/" + timelinePath;
        fetch(apiUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        data: result,
                        error: null
                    });
                },
                (error) => {
                    this.setState({
                        data: null,
                        error: error
                    });
                }
            );
    }

    render() {
        let error = this.state.error;
        let data = this.state.data;
        let returnElement = null;

        if (error == null && data == null) {
            returnElement = create(WaitComponent, {key: "waitComponent"}, null);
        }

        if (error != null) {
            returnElement = create(ErrorComponent, {key: "errorComponent"}, null)
        }

        if (data != null) {
            let tweetElements = [];
            data.forEach((obj, index) => {
                tweetElements.push(
                    create(TweetComponent, {key: "tweetComponent" + index, index: index, tweet: obj}, null)
                );
            });


            returnElement = tweetElements;
        }
        
        return create(
            "div",
            {className: "tweetTable"},
            returnElement
        );
    }
}

class WaitComponent extends React.Component {
    render() {
        return create (
            "div",
            {className: "wait"},
            "Retrieving information, please wait!"
        );
    }
}

class ErrorComponent extends React.Component {
    render() {
        return create(
            "div",
            {className: "error"},
            "An error has occurred. Please contact your administration."
        );
    }
}

class TweetComponent extends React.Component {
    render() {
        return create(
            "div",
            {
                key: "tweetRow" + this.props.index,
                className: "tweetRow"
            },
            [
                create(UserInfoComponent, {key: "userInfoComponent" + this.props.index, index: this.props.index, user: this.props.tweet.user}, null),
                create(TweetInfoComponent, {key: "tweetInfoComponent" + this.props.index, index: this.props.index, tweet: this.props.tweet}, null)
            ]
        )
    }
}

class UserInfoComponent extends React.Component {
    render() {
        return create(
            "div",
            {
                key: "userInfo" + this.props.index,
                className: "userInfo"
            },
            [
                create(
                    "img",
                    {
                        key: "userImg" + this.props.index,
                        className: "userImg", 
                        src: this.props.user.profileImageUrl
                    }
                ),
                create(
                    "div",
                    {
                        key: "userName" + this.props.index,
                        className: "userName"
                    },
                    this.props.user.name
                ),
                create(
                    "div",
                    {
                        key: "userHandle" + this.props.index,
                        className: "userHandle"
                    },
                    this.props.user.twitterHandle
                )
            ]
        );
    }
}

class TweetInfoComponent extends React.Component {
    render() {
        let fullDate = new Date(this.props.tweet.createdAt);
        let dateToShow = month[fullDate.getMonth()].substring(0, 3) + " " + fullDate.getDate();

        return create(
            "div",
            {
                key: "tweetInfo" + this.props.index,    
                className: "tweetInfo"
            },
            [
                create(
                    "div",
                    {
                        key: "date" + this.props.index,
                        className: "date"
                    },
                    dateToShow
                ),
                create(
                    "a",
                    {
                        key: "link" + this.props.index,
                        href: this.props.tweet.link, 
                        target: "_blank"
                    },
                    create(
                        "div",
                        {
                            key: "message" + this.props.index,
                            className: "message"
                        },
                        this.props.tweet.message
                    )
                )
            ]
        );
    }
}