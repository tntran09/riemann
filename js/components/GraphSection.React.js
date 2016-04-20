var React = require('react/dist/react.min');
var RiemannActions = require('../actions/RiemannActions');
var GraphSvg = require('./GraphSvg.React');

var GraphSection = React.createClass({
  propTypes: {
    data: React.PropTypes.arrayOf(React.PropTypes.array).isRequired,
    lineType: React.PropTypes.string,
    rectHeights: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
    sumType: React.PropTypes.string.isRequired
  },

  render: function () {
    return (
      <div id="graphSection" className="col-xs-9" hidden={this.props.data.length == 0}>
        <div className="row">
          <div className="col-xs-offset-3 col-xs-3">
            <label htmlFor="sumType">Sum Method</label>
            <select name="sumType" className="form-control" ref="sumType" onChange={this._updateSumType} value={this.props.sumType}>
              <option>Upper</option>
              <option>Lower</option>
              <option>Left</option>
              <option>Right</option>
              <option>Midpoint</option>
            </select>
          </div>
          <div className="col-xs-3">
            <label htmlFor="lineType">Interpolate</label>
            <select name="lineType" className="form-control" ref="lineType" onChange={this._updateLineType} value={this.props.lineType}>
              <option>Linear</option>
              <option>Basis</option>
              <option>None</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <GraphSvg data={this.props.data} lineType={this.props.lineType} sumType={this.props.sumType} rectHeights={this.props.rectHeights} />
          </div>
        </div>
      </div>
    );
  },

  _updateLineType: function () {
    RiemannActions.changeLineType(this.refs.lineType.value);
  },

  _updateSumType: function () {
    RiemannActions.changeSumType(this.refs.sumType.value);
  }
});

module.exports = GraphSection;
