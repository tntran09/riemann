var React = require('react/dist/react.min');
var d3 = require('d3/d3.min');

var GraphSvg = React.createClass({
  propTypes: {
    data: React.PropTypes.arrayOf(React.PropTypes.array).isRequired,
    rectHeights: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
    sumType: React.PropTypes.string.isRequired
  },

  getInitialState: function () {
    return {
      ORIGIN_X: 100,
      ORIGIN_Y: 350,
      xToSvgFactor: 20,
      yToSvgFactor: 30
    }
  },

  componentDidMount: function () {
    this._buildAxes();
  },

  componentDidUpdate: function () {
    this._buildAxes();
  },

  componentWillReceiveProps: function (nextProps) {
    // console.log('will receive props!');
  },

  render: function () {
    // draw the rectangles based on the sumType
    var rects = this._buildRects(this.props.data, this.props.rectHeights);
    // draw the interpolated line
    var line = this._buildLine(this.props.data);
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
      var x = this._toSvgX(data[i][0]);
      var y = this._toSvgY(heightArray[i]);
      var width = this._toSvgX(data[i + 1][0]) - this._toSvgX(data[i][0]);
      var height = this.state.ORIGIN_Y - y;
      rects.push(
        <rect x={x} y={y} width={width} height={height} />
      );
    }

    return rects;
  },

  _buildLine: function (data) {
    var lineGenFn = d3.svg.line()
      .x(function (d) { return this._toSvgX(d[0]); })
      .y(function (d) { return this._toSvgY(d[1]); })
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
      var cx = this._toSvgX(data[i][0]);
      var cy = this._toSvgY(data[i][1]);
      points.push(
        <circle key={i} cx={cx} cy={cy} r="3" style={{fill: 'black'}} />
      );
    }

    return points;
  },

  _buildAxes: function () {
    // Drawing axes is done by D3 after the component is mounted or updated
    // TODO: Calculate axes based on origin, data
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
