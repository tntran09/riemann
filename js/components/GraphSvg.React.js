var React = require('react/dist/react.min');
var d3 = require('d3/d3.min');

var GraphSvg = React.createClass({
  propTypes: {
    data: React.PropTypes.arrayOf(React.PropTypes.array).isRequired,
    sumType: React.PropTypes.string.isRequired
  },

  getInitialState: function () {
    return {
      ORIGIN_X: 100,
      ORIGIN_Y: 350
    }
  },

  render: function () {
    // draw the rectangles based on the sumType
    var rects = this._buildRects(this.props.data);
    // draw the interpolated line
    var line = this._buildLine(this.props.data);
    // draw the points
    var points = this._buildPoints(this.props.data);
    // build axes, scales, etc.
    // var xScale = d3.scale.linear.domain()
    // var xAxis = d3.svg.axis();
    // xAxis.scale()

    return (
      <svg id="graphSvg" width="800" height="400" style={{border: '1px solid black'}}>
        {line}
        {points}
      </svg>
    );
  },

  _buildRects: function (data) {
    var rects = [];
    return rects;
  },

  _buildLine: function (data) {
    var lineGenFn = d3.svg.line()
      .x(function (d) { return (d[0] / 30) * 600 + this.state.ORIGIN_X; })
      .y(function (d) { return -(d[1] / 10) * 300 + this.state.ORIGIN_Y; })
      .interpolate('linear');

    return (
      <path d={lineGenFn.call(this, data)} style={{stroke: 'black', fill: 'none', strokeWidth: '2px'}}></path>
    );
  },

  _buildPoints: function (data) {
    var points = [];

    for(var i = 0; i < data.length; i++) {
      var _x = data[i][0], _y = data[i][1];
      var cx = (_x / 30) * 600 + 100;
      var cy = -(_y / 10) * 300 + 350;
      points.push(
        <circle key={i} cx={cx} cy={cy} r="3" style={{fill: 'black'}} />
      );
    }

    return points;
  }
});

module.exports = GraphSvg;
