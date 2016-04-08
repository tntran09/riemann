var React = require('react/dist/react.min');
var RiemannActions = require('../actions/RiemannActions');
var Graph = require('./GraphSvg.React');

var GraphSection = React.createClass({
  propTypes: {
    data: React.PropTypes.arrayOf(React.PropTypes.array).isRequired,
    sumType: React.PropTypes.string.isRequired
  },

  render: function () {
    return (
      <div id="graphSection" className="col-xs-10">
        <div className="row">
          <div className="col-xs-offset-5 col-xs-3">
            <label htmlFor="sumType">Sum Method</label>
            <select name="sumType" className="form-control" ref="sumType" onChange={this._updateSumType} value={this.props.sumType}>
              <option>Upper</option>
              <option>Lower</option>
              <option>Left</option>
              <option>Right</option>
            </select>
          </div>
        </div>

        <Graph data={this.props.data} sumType={this.props.sumType} />
      </div>
    );
  },

  _updateSumType: function () {
    RiemannActions.changeSumType(this.refs.sumType.value)
  }
});

module.exports = GraphSection;
