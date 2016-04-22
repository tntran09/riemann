var React = require('react/dist/react.min');
var RiemannStore = require('../stores/RiemannStore');
var HeaderSection = require('./HeaderSection.React');
var DataPointsSection = require('./DataPointsSection.React');
var GraphSection = require('./GraphSection.React');
var CalcSection = require('./CalcSection.React');

var RiemannApp = React.createClass({
  getInitialState: function () {
    return RiemannStore.getAppState();
  },

  componentDidMount: function() {
    RiemannStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    RiemannStore.removeChangeListener(this._onChange);
  },

  render: function () {
    return (
      <div id="riemannApp">
        <HeaderSection />
        <DataPointsSection data={this.state.dataPoints} showLine={this.state.showLine} sumType={this.state.sumType} />
        <GraphSection data={this.state.dataPoints} showLine={this.state.showLine} rectHeights={this.state.rectHeights} />
        <CalcSection data={this.state.dataPoints} sumType={this.state.sumType} rectHeights={this.state.rectHeights} totalRiemannSum={this.state.totalRiemannSum} />
      </div>
    );
  },

  _onChange: function() {
    this.setState(RiemannStore.getAppState());
  }
});

module.exports = RiemannApp;
