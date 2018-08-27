import {HeaderComponent, BodyComponent} from './components.js';
import React from 'react';
import ReactDOM from 'react-dom';

export const run = () => {
    ReactDOM.render(
        [React.createElement(HeaderComponent, {key: "headerComponent"}), React.createElement(BodyComponent, {key: "bodyComponent"})],
        document.getElementById("reactApp")
    );
}