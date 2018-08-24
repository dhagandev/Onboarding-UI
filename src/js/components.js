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

export class TimelineComponent extends React.Component {
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
        console.log(this.state);

        if (error == null && data == null) {
            returnElement = create (
                "div",
                {className: "wait"},
                "Retrieving information, please wait!"
            )
        }

        if (error != null) {
            returnElement = create(
                "div",
                {className: "error"},
                "An error has occurred. Please contact your administration."
            )            
        }

        if (data != null) {
            let tweetElements = [];
            data.forEach((obj) => {
                let user = obj.user;
                let fullDate = new Date(obj.createdAt);
                let dateToShow = month[fullDate.getMonth()].substring(0, 3) + " " + fullDate.getDate();
                
                tweetElements.push(
                    create(
                        "div",
                        {className: "tweetRow"},
                        [
                            // User Info
                            create(
                                "div",
                                {className: "userInfo"},
                                [
                                    //Image
                                    create(
                                        "img",
                                        {className: "userImg", src: user.profileImageUrl}
                                    ),
                                    //Name
                                    create(
                                        "div",
                                        {className: "userName"},
                                        user.name
                                    ),
                                    //Handle
                                    create(
                                        "div",
                                        {className: "userHandle"},
                                        user.twitterHandle
                                    )
                                ]
                            ),
                            //Tweet Info
                            create(
                                "div",
                                {className: "tweetInfo"},
                                [
                                    //Date
                                    create(
                                        "div",
                                        {className: "date"},
                                        dateToShow
                                    ),
                                    create(
                                        "a",
                                        {href: obj.link, target: "_blank"},
                                        create(
                                            "div",
                                            {className: "message"},
                                            obj.message
                                        )
                                    )
                                ]
                            )
                        ]
                    )
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