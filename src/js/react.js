class App extends React.Component {
    render() {
        return React.createElement(
          "div",
          null,
          "Hello react!"
        );
    }
}

function run() {
    ReactDOM.render(
        React.createElement(App),
        document.getElementById("reactComponent")
    );
}

const loadedStates = ['complete', 'loaded', 'interactive'];

if (loadedStates.includes(document.readyState) && document.body) {
    run();
} else {
    window.addEventListener('DOMContentLoaded', run, false);
}