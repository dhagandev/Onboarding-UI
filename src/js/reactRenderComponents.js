import {HelloComponent} from './hello.js';
import React from 'react';
import ReactDOM from 'react-dom';

export const run = () => {
    ReactDOM.render(
        React.createElement(HelloComponent),
        document.getElementById("reactComponent")
    );
}