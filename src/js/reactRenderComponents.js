import {HeaderComponent, TimelineTableComponent} from './components.js';
import React from 'react';
import ReactDOM from 'react-dom';

export const run = () => {
    ReactDOM.render(
        [React.createElement(HeaderComponent), React.createElement(TimelineTableComponent)],
        document.getElementById("reactBody")
    );
}