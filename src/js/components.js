import React from 'react';

const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const create = React.createElement;

export class HeaderComponent extends React.Component {
    render() {
        return create(
            "div",
            {className: "header"},
            [
                create(
                    "div",
                    {id: "labHeader"},
                    "Lab for Dana"
                ),
                create(
                    "button",
                    {id: "timelineButton", className: "button"},
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
        fetch("http://localhost:8080/api/1.0/twitter/timeline")
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
        console.log(data);

        if (error == null && data == null) {
            returnElement = create(WaitComponent);
        }

        if (error != null) {
            returnElement = create(ErrorComponent)
        }

        if (data != null) {
            let tweetElements = [];
            data.forEach((obj) => {
                tweetElements.push(
                    create(TweetComponent, {tweet: obj}, null)
                );
            });


            returnElement = tweetElements;
        }
        console.log("returnElement");
        console.log(returnElement);
        
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
            {className: "tweetRow"},
            [
                create(UserInfoComponent, {user: this.props.tweet.user}, null),
                create(TweetInfoComponent, {tweet: this.props.tweet}, null)
            ]
        )
    }
}

class UserInfoComponent extends React.Component {
    render() {
        return create(
            "div",
            {className: "userInfo"},
            [
                create(
                    "img",
                    {className: "userImg", src: this.props.user.profileImageUrl}
                ),
                create(
                    "div",
                    {className: "userName"},
                    this.props.user.name
                ),
                create(
                    "div",
                    {className: "userHandle"},
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
            {className: "tweetInfo"},
            [
                create(
                    "div",
                    {className: "date"},
                    dateToShow
                ),
                create(
                    "a",
                    {href: this.props.tweet.link, target: "_blank"},
                    create(
                        "div",
                        {className: "message"},
                        this.props.tweet.message
                    )
                )
            ]
        );
    }
}