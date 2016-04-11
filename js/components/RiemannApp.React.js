var React = require('react/dist/react.min');
var RiemannStore = require('../stores/RiemannStore');
var HeaderSection = require('./HeaderSection.React');
var DataPointsSection = require('./DataPointsSection.React');
var GraphSection = require('./GraphSection.React');
var CalcSection = require('./CalcSection.React');

function getAppState() {
  return {
    dataPoints: RiemannStore.getDataPoints(),
    rectHeights: RiemannStore.getRectHeights(),
    sumType: RiemannStore.getSumType()
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

  render: function () {
    return (
      <div id="riemannApp" className="container">
        <HeaderSection />
        <div className="row">
          <DataPointsSection data={this.state.dataPoints} />
          <GraphSection data={this.state.dataPoints} sumType={this.state.sumType} rectHeights={this.state.rectHeights} />
        </div>
        <CalcSection />
      </div>
    );
  },

  _onChange: function() {
    this.setState(getAppState());
  }
});

module.exports = RiemannApp;
