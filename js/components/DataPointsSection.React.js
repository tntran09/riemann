var React = require('react');
var RiemannActions = require('../actions/RiemannActions');

var DataPointsSection = React.createClass({
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
    var tbody = this._buildTableBody(this.props.data);

    return (
      <div id="dataPointsSection" className="col-xs-2">
      <h3>Data</h3>
        <table className="table table-hover">
          <tbody>
            {tbody}
          </tbody>
        </table>
      </div>
    );
  },

  _buildTableRow: function (key, pt) {
    return (
      <tr key={key}>
        <td>(</td>
        <td>{pt[0]}</td>
        <td>, {pt[1]}</td>
        <td>)</td>
        <td>
          <button type="button" className="close" onClick={this._deleteDataPoint.bind(this, key)}>
            <span>&times;</span>
          </button>
        </td>
      </tr>
    );
  },

  _buildTableBody: function (data) {
    var rows = [];

    for(var i = 0; i < data.length; i++) {
      rows.push(this._buildTableRow(i, data[i]));
    }

    return rows;
  },

  _deleteDataPoint: function (index) {
    RiemannActions.delete(index);
  }
});

module.exports = DataPointsSection;
