var React = require('react/dist/react.min');
var RiemannActions = require('../actions/RiemannActions');

var DataPointsSection = React.createClass({
  propTypes: {
    data: React.PropTypes.arrayOf(React.PropTypes.array).isRequired,
    sumType: React.PropTypes.string.isRequired,
    showLine: React.PropTypes.bool.isRequired
  },

  componentDidMount: function () {
    this.refs.addButton.disabled = true;
  },

  render: function () {
    var tbody = this._buildTableBody(this.props.data);

    return (
      <div id="dataPointsSection" className="container">
        <button type="button" ref="hamburgerButton" className="hamburger hamburger--arrow" onClick={this._toggleHamburger}>
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>

        <div className="form-group">
          <label htmlFor="showLine">
            <input type="checkbox" name="showLine" id="showLine" onChange={this._toggleShowLine} checked={this.props.showLine}/>
            Show line
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="sumType">Sum Method</label>
          <select name="sumType" className="form-control" id="sumType" ref="sumType" onChange={this._updateSumType} value={this.props.sumType}>
            <option>Upper</option>
            <option>Lower</option>
            <option>Left</option>
            <option>Right</option>
            <option>Midpoint</option>
          </select>
        </div>
        <h3>Data</h3>
        <form>
        <table className="table table-hover">
          <tbody>
            <tr>
              <td>(</td>
              <td><input name="inputX" ref="inputX" className="form-control" placeholder="X" onChange={this._validateInput} /></td>
              <td><input name="inputY" ref="inputY" className="form-control" placeholder="Y" onChange={this._validateInput} /></td>
              <td>)</td>
              <td><button type="submit" ref="addButton" className="btn btn-default" onClick={this._addDataPoint}> + </button></td>
            </tr>
            {tbody}
          </tbody>
        </table>
        </form>
      </div>
    );
  },

  _addDataPoint: function (event) {
    RiemannActions.addPoint(parseFloat(this.refs.inputX.value), parseFloat(this.refs.inputY.value));
    this.refs.inputX.value = '';
    this.refs.inputY.value = '';
    this.refs.addButton.disabled = true;
    this.refs.inputX.focus();
    event.preventDefault();
  },

  _buildTableRow: function (key, pt) {
    return (
      <tr key={key}>
        <td>(</td>
        <td>{pt[0]}</td>
        <td>, {pt[1]}</td>
        <td>)</td>
        <td>
          <button type="button" className="close" onClick={this._deleteDataPoint.bind(this, key)} style={{float: 'left'}}>
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
  },

  _toggleHamburger: function () {
    if (this.refs.hamburgerButton.classList.length > 2) {
      this.refs.hamburgerButton.className = 'hamburger hamburger--arrow';
    }
    else {
      this.refs.hamburgerButton.className += ' is-active';
    }
  },

  _toggleShowLine: function () {
    RiemannActions.toggleShowLine();
  },

  _updateSumType: function () {
    RiemannActions.changeSumType(this.refs.sumType.value);
  },

  _validateInput: function () {
    var _x = parseFloat(this.refs.inputX.value), _y = parseFloat(this.refs.inputY.value);
    this.refs.addButton.disabled =
        Number.isNaN(_x) ||
        Number.isNaN(_y) ||
        this.props.data.some(function (point) { return point[0] == _x; });
  }
});

module.exports = DataPointsSection;
