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

        <button type="button" ref="hamburgerButton" id="hamburgerButton" className="hamburger is-active hamburger--arrow-r" onClick={this._toggleHamburger}>
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>

        <GraphSection data={this.state.dataPoints} showLine={this.state.showLine} rectHeights={this.state.rectHeights} />
        <CalcSection data={this.state.dataPoints} sumType={this.state.sumType} rectHeights={this.state.rectHeights} totalRiemannSum={this.state.totalRiemannSum} />
      </div>
    );
  },

  _onChange: function() {
    this.setState(RiemannStore.getAppState());
  },

  _toggleHamburger: function () {
    var arrowClass = this.refs.hamburgerButton.classList[2];

    if (arrowClass.length == 16) {
      this.refs.hamburgerButton.className = 'hamburger is-active hamburger--arrow-r';
      document.getElementById('dataPointsSection').className = 'container';
    }
    else {
      this.refs.hamburgerButton.className = 'hamburger is-active hamburger--arrow pull-out';
      document.getElementById('dataPointsSection').className = 'container pull-out';
    }
  }
});

module.exports = RiemannApp;
