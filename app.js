var React = require('react')
var TweetsApp = require('./components/TweetsApp.react.js')
var initialState = JSON.parse(document.getElementById('initial-state').innerHTML)

React.renderComponent(
    <TweetsApp tweets={initialState} />,
    document.getElementById('react-app')
)
