var React = require('react/dist/react.min');
var d3 = require('d3/d3.min');

var GraphSvg = React.createClass({
  propTypes: {
    data: React.PropTypes.arrayOf(React.PropTypes.array).isRequired,
    rectHeights: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
    sumType: React.PropTypes.string.isRequired
  },

  getInitialState: function () {
    console.log(this.props.data.length);
    return {
      ORIGIN_X: 50,
      ORIGIN_Y: 350,
      xToSvgFactor: 25,
      yToSvgFactor: 30,
      xScale: d3.scale.linear().domain([0, 24]).range([50, 650]).nice(),
      yScale: d3.scale.linear().domain([0, 10]).range([350, 50]).nice()
    }
  },

  componentDidMount: function () {
    this._buildAxes();
  },

  componentDidUpdate: function () {
    this._buildAxes();
  },

  componentWillReceiveProps: function (nextProps) {
    var ar = nextProps.data;
    var xMin = 0, xMax = 1, yMin = 0, yMax = 1;

    for(var i = 0; i < ar.length; i++) {
      xMin = Math.min(xMin, ar[i][0]);
      xMax = Math.max(xMax, ar[i][0]);
      yMin = Math.min(yMin, ar[i][1]);
      yMax = Math.max(yMax, ar[i][1]);
    }
    xMin = Math.round(xMin);
    xMax = Math.round(xMax);
    yMin = Math.round(yMin);
    yMax = Math.round(yMax);

    var xs = this.state.xScale.domain([xMin, xMax]);
    var ys = this.state.yScale.domain([yMin, yMax]);
    this.setState({
      xToSvgFactor: 600 / (xMax - xMin),
      yToSvgFactor: 300 / (yMax - yMin),
      ORIGIN_X: xs(0),
      ORIGIN_Y: ys(0),
      xScale: xs,
      yScale: ys
    });
  },

  render: function () {
    // draw the rectangles based on the sumType
    var rects = this._buildRects(this.props.data, this.props.rectHeights);
    // draw the interpolated line
    var line = this._buildLine(this.props.data, this.props.lineType);
    // draw the points
    var points = this._buildPoints(this.props.data);

    return (
      <svg id="graphSvg" width="800" height="400">
        {rects}
        {line}
        {points}
        <g id="xAxisGroup" ref="xAxisGroup" className="axis" transform={'translate(0, '+this.state.ORIGIN_Y+')'}></g>
        <g id="yAxisGroup" ref="yAxisGroup" className="axis" transform={'translate('+this.state.ORIGIN_X+', 0)'}></g>
      </svg>
    );
  },

  _toSvgX: function (_x) {
    return (_x * this.state.xToSvgFactor) + this.state.ORIGIN_X;
  },

  _toSvgY: function (_y) {
    return -(_y * this.state.yToSvgFactor) + this.state.ORIGIN_Y;
  },

  _buildRects: function (data, heightArray) {
    var rects = [];
    for(var i = 0; i < heightArray.length; i++) {
      var neg = heightArray[i] < 0;
      var x = this._toSvgX(data[i][0]);
      var y = neg ? this.state.ORIGIN_Y : this._toSvgY(heightArray[i]);
      var width = this.state.xToSvgFactor * (data[i + 1][0] - data[i][0]);
      var height = Math.abs(heightArray[i] * this.state.yToSvgFactor);
      rects.push(
        <rect x={x} y={y} width={width} height={height} className={neg ? 'red' : 'blue'} />
      );
    }

    return rects;
  },

  _buildLine: function (data, lineType) {
    if (lineType === 'None') {
      return '';
    }

    var lineGenFn = d3.svg.line()
      .x(function (d) { return this._toSvgX(d[0]); })
      .y(function (d) { return this._toSvgY(d[1]); })
      .interpolate(lineType.toLowerCase());

    return (
      <path d={lineGenFn.call(this, data)}></path>
    );
  },

  _buildPoints: function (data) {
    var points = [];

    for(var i = 0; i < data.length; i++) {
      var cx = this._toSvgX(data[i][0]);
      var cy = this._toSvgY(data[i][1]);
      points.push(
        <circle key={i} cx={cx} cy={cy} r="3" />
      );
    }

    return points;
  },

  _buildAxes: function () {
    // Drawing axes is done by D3 after the component is mounted or updated
    var xAxisFn = d3.svg.axis()
      .ticks(12)
      .tickSize(10, 1)
      .scale(this.state.xScale)
      .orient('bottom');

    var yAxisFn = d3.svg.axis()
      .ticks(5)
      .tickSize(10, 1)
      .scale(this.state.yScale)
      .orient('left');

    d3.select(this.refs.xAxisGroup).call(xAxisFn);
    d3.select(this.refs.yAxisGroup).call(yAxisFn);
  }
});

module.exports = GraphSvg;
