const HelloComponent = require('./hello.js');
exports.run = () => {
    ReactDOM.render(
        React.createElement(HelloComponent),
        document.getElementById("reactComponent")
    );
}