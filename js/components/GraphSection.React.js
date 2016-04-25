var React = require('react/dist/react.min');
var RiemannActions = require('../actions/RiemannActions');
var GraphSvg = require('./GraphSvg.React');

var GraphSection = React.createClass({
  propTypes: {
    data: React.PropTypes.arrayOf(React.PropTypes.array).isRequired,
    rectHeights: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
    showLine: React.PropTypes.bool.isRequired
  },

  render: function () {
    return (
      <div id="graphSection" className="container-fluid" hidden={this.props.data.length == 0}>
        <div className="row">
          <div className="col-xs-12">
            <GraphSvg data={this.props.data} rectHeights={this.props.rectHeights} showLine={this.props.showLine} />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = GraphSection;
