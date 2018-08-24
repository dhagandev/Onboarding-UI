import {HeaderComponent, TimelineComponent} from './components.js';
import React from 'react';
import ReactDOM from 'react-dom';

export const run = () => {
    ReactDOM.render(
        [React.createElement(HeaderComponent), React.createElement(TimelineComponent)],
        document.getElementById("reactBody")
    );
}