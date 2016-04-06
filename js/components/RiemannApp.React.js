var React = require('react');
var RiemannStore = require('../stores/RiemannStore')

var RiemannApp = React.createClass({
  render: function () {
    return (
      <div id="riemannApp">
        <div id="coordinatesSection"></div>
        <div id="graphSection"></div>
      </div>
    );
  }
});

module.exports = RiemannApp;
