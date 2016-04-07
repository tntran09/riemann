var React = require('react');
//var Graph = require('./Graph.React');
//var d3 = require('d3');

var GraphSection = React.createClass({
  propTypes: {
    data: React.PropTypes.arrayOf(React.PropTypes.array).isRequired
  },

  render: function () {
    var listItems = [];
    for(var i = 0; i < this.props.data.length; i++) {
      var pt = this.props.data[i];

      listItems.push(
        <li key={i}>({pt[0]}, {pt[1]})</li>
      );
    }

    return (
      <div id="graphSection">
        <div className="row">
          <div className="col-xs-offset-5 col-xs-2">
            <label htmlFor="sumType">Sum Method</label>
            <select name="sumType" className="form-control">
              <option>Upper</option>
              <option>Lower</option>
              <option>Left</option>
              <option>Right</option>
            </select>
          </div>
        </div>
        <ul style={{listStyleType: 'none'}}>
          {listItems}
        </ul>
      </div>
    );
  }
});

module.exports = GraphSection;
