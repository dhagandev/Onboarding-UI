import React from 'react';
import _ from 'lodash';
import {apiGetTimeline} from './service.js'

const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const create = React.createElement;

export class HeaderComponent extends React.Component {
    render() {
        return create(
            "div",
            {key: "header", className: "header"},
            "Lab for Dana"
        );
    }
}

export class BodyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.onTimelineClickHandler = this.onTimelineClickHandler.bind(this);
        this.state = {
            data: null,
            error: null
        };
    }

    componentDidMount() {
        this.onTimelineClickHandler();
    }

    onTimelineClickHandler() {
        this.setStateVal(null, null);
        apiGetTimeline().then(result => this.setStateVal(result, null)).catch(result => this.setStateVal(null, result));
    }

    setStateVal(data, error) {
        this.setState({
            data: data,
            error: error
        });
    }

    render() {
        return create(
            "div",
            {key: "body", className:"body"},
            [
                create(ButtonComponent, {key: "timelineButton", id: "timelineButton", handler: this.onTimelineClickHandler, buttonText: "Get Timeline"}),
                create(TimelineTableComponent, {key: "timelineTableComponent", data: this.state.data, error: this.state.error})
            ]
        );
    }
}

export class ButtonComponent extends React.Component {
    render() {
        return create(
            "button",
            {
                id: this.props.id, 
                onClick: this.props.handler,
                className: "button"
            },
            this.props.buttonText
        );
    }
}

export class TimelineTableComponent extends React.Component {
    render() {
        let error = this.props.error;
        let data = this.props.data;
        let returnElement = null;

        if (error == null && data == null) {
            returnElement = create(WaitComponent, {key: "waitComponent"});
        }
        else if (error != null) {
            returnElement = create(ErrorComponent, {key: "errorComponent"})
        }
        else if (data != null) {
            let tweetElements = [];
            returnElement = _.map(data, (value, index) => {
                                return create(TweetComponent, {key: "tweetComponent" + index, index: index, tweet: value});
                            });
        }
        
        return create(
            "div",
            {className: "tweetTable"},
            returnElement
        );
    }
}

export class WaitComponent extends React.Component {
    render() {
        return create (
            "div",
            {className: "wait"},
            "Retrieving information, please wait!"
        );
    }
}

export class ErrorComponent extends React.Component {
    render() {
        return create(
            "div",
            {className: "error"},
            "An error has occurred. Please contact your administration."
        );
    }
}

export class TweetComponent extends React.Component {
    render() {
        return create(
            "div",
            {
                key: "tweetRow" + this.props.index,
                className: "tweetRow"
            },
            [
                create(UserInfoComponent, {key: "userInfoComponent" + this.props.index, index: this.props.index, user: this.props.tweet.user}),
                create(TweetInfoComponent, {key: "tweetInfoComponent" + this.props.index, index: this.props.index, tweet: this.props.tweet})
            ]
        )
    }
}

export class UserInfoComponent extends React.Component {
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

export class TweetInfoComponent extends React.Component {
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