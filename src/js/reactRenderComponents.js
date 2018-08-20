function run() {
    ReactDOM.render(
        React.createElement(HelloComponent),
        document.getElementById("reactComponent")
    );
}

window.addEventListener('DOMContentLoaded', run, false);