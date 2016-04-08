var React = require('react');
var RiemannActions = require('../actions/RiemannActions');
//var Graph = require('./Graph.React');
//var d3 = require('d3');

var GraphSection = React.createClass({
  render: function () {
    return (
      <div id="graphSection" className="col-xs-10">
        <div className="row">
          <div className="col-xs-offset-5 col-xs-3">
            <label htmlFor="sumType">Sum Method</label>
            <select name="sumType" className="form-control" ref="sumType" onChange={this._changeSumType} value={this.props.sumType}>
              <option>Upper</option>
              <option>Lower</option>
              <option>Left</option>
              <option>Right</option>
            </select>
          </div>
        </div>


      </div>
    );
  },

  _changeSumType: function () {
    RiemannActions.changeSumType(this.refs.sumType.value)
  }
});

module.exports = GraphSection;
