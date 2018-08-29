import {HeaderComponent, BodyComponent} from './components.js';
import React from 'react';
import ReactDOM from 'react-dom';

window.onload = () => {
    ReactDOM.render(
        [React.createElement(HeaderComponent, {key: "headerComponent"}), React.createElement(BodyComponent, {key: "bodyComponent"})],
        document.getElementById("reactApp")
    );
}