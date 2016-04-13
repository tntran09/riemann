var React = require('react/dist/react.min');

var CalcSection = React.createClass({
  propTypes: {
    data: React.PropTypes.arrayOf(React.PropTypes.array).isRequired,
    rectHeights: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
    sumType: React.PropTypes.string.isRequired,
    totalRiemannSum: React.PropTypes.number.isRequired
  },

  render: function () {
    var eqnParts1 = this.props.rectHeights.map(function (value, i) {
      return '(' + (this.props.data[i + 1][0] - this.props.data[i][0]) + ')(' + value + ')';
    }, this);
    var eqnParts2 = this.props.rectHeights.map(function (value, i) {
      var t = (this.props.data[i + 1][0] - this.props.data[i][0]) * value;
      return '(' + (Math.round(t * 1000000) / 1000000) + ')';
    }, this);

    return (
      <div id="calcSection" style={{fontSize: '2.5em'}} hidden={this.props.rectHeights.length == 0}>
        <p>{this.props.sumType} Sum</p>
        <p>= {eqnParts1.join(' + ')}</p>
        <p>= {eqnParts2.join(' + ')}</p>
        <p>= {this.props.totalRiemannSum}</p>
      </div>
    );
  }
});

module.exports = CalcSection;
