var React = require('react');
var RiemannStore = require('../stores/RiemannStore');
var HeaderSection = require('./HeaderSection.React');
var GraphSection = require('./GraphSection.React');

function getAppState() {
  return {
    dataPoints: RiemannStore.getDataPoints()
  };
}

var RiemannApp = React.createClass({
  getInitialState: function () {
    return getAppState();
  },

  componentDidMount: function() {
    RiemannStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    RiemannStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getAppState());
  },

  render: function () {
    return (
      <div id="riemannApp" className="container">
        <HeaderSection />
        <div id="coordinatesSection"></div>
        <GraphSection data={this.state.dataPoints} />
        <div id="calcSection"></div>
      </div>
    );
  }
});

module.exports = RiemannApp;
