import React from 'react';

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

export class TimelineComponent extends React.Component {
    constructor() {
        super()
        this.state = {
            data: null
        }
    }

    componentDidMount() {
        request('get', this.props.api, (error, response, body) => {
            if (!error && response.statusCode == 200) {

            }
            else {
                return error;
            }
        });
    }

    render() {
        return create(
            "div",
            {className: "tweetTable"},
            [
                //Error
                create(
                    "div",
                    {className: "error"},
                    "An error has occurred. Please contact your administration."
                ),
                //Wait
                create(
                    "div",
                    {className: "wait"},
                    "Retrieving information, please wait!"
                ),
                //Timeline (start of it)
                create(
                    "div",
                    {},
                    "Hi."
                )
            ]
        );
    }
}