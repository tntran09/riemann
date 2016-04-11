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

  componentDidMount: function () {
    this._buildAxes();
  },

  // componentDidUpdate: function () {
  //   this._buildAxes();
  // },

  render: function () {
    // draw the rectangles based on the sumType
    var rects = this._buildRects(this.props.data);
    // draw the interpolated line
    var line = this._buildLine(this.props.data);
    // draw the points
    var points = this._buildPoints(this.props.data);

    return (
      <svg id="graphSvg" width="800" height="400" style={{border: '1px solid black'}}>
        {line}
        {points}
        <g id="xAxisGroup" ref="xAxisGroup" className="axis" transform={'translate(0, '+this.state.ORIGIN_Y+')'}></g>
        <g id="yAxisGroup" ref="yAxisGroup" className="axis" transform={'translate('+this.state.ORIGIN_X+', 0)'}></g>
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

    var style = {
      fill: 'none',
      stroke: 'black',
      strokeWidth: '2px'
    };

    return (
      <path d={lineGenFn.call(this, data)} style={style}></path>
    );
  },

  _buildPoints: function (data) {
    var points = [];

    for(var i = 0; i < data.length; i++) {
      var _x = data[i][0], _y = data[i][1];
      var cx = (_x / 30) * 600 + this.state.ORIGIN_X;
      var cy = -(_y / 10) * 300 + this.state.ORIGIN_Y;
      points.push(
        <circle key={i} cx={cx} cy={cy} r="3" style={{fill: 'black'}} />
      );
    }

    return points;
  },

  _buildAxes: function () {
    // build axes, scales, etc.
    var xScale = d3.scale.linear().domain([0, 24]).range([100, 580]).nice();
    var xAxisFn = d3.svg.axis()
      .ticks(12)
      .tickSize(10, 1)
      .scale(xScale)
      .orient('bottom');
    var yScale = d3.scale.linear().domain([0, 10]).range([350, 50]).nice();
    var yAxisFn = d3.svg.axis()
      .ticks(5)
      .tickSize(10, 1)
      .scale(yScale)
      .orient('left');

    d3.select(this.refs.xAxisGroup).call(xAxisFn);
    d3.select(this.refs.yAxisGroup).call(yAxisFn);
  }
});

module.exports = GraphSvg;
