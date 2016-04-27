var React = require('react/dist/react.min');
var d3 = require('d3/d3.min');

var GraphSvg = React.createClass({
  propTypes: {
    data: React.PropTypes.arrayOf(React.PropTypes.array).isRequired,
    rectHeights: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
    showLine: React.PropTypes.bool.isRequired
  },

  getInitialState: function () {
    return this._getState(this.props.data);
  },

  componentDidMount: function () {
    this._buildAxes();

    var resizing = false;
    window.addEventListener('resize', function () {
      if (!resizing) {
        resizing = true;
        setTimeout(function () {
          this.setState(this._getState(this.props.data));
          this._buildAxes();
          resizing = false;
        }.bind(this), 50); // 20fps
      }
      else {
        console.log('did not resize');
      }
    }.bind(this));
  },

  componentDidUpdate: function () {
    this._buildAxes();
  },

  componentWillReceiveProps: function (nextProps) {
    this.setState(this._getState(nextProps.data));
  },

  _getState: function (data) {
    var width = document.body.clientWidth;
    width -= width > 768 ? 300 : 32;
    var whiteSpace = width / 10;

    var xMin = 0, xMax = 1, yMin = 0, yMax = 1;
    for(var i = 0; i < data.length; i++) {
      xMin = Math.min(xMin, data[i][0]);
      xMax = Math.max(xMax, data[i][0]);
      yMin = Math.min(yMin, data[i][1]);
      yMax = Math.max(yMax, data[i][1]);
    }
    xMin = Math.round(xMin);
    xMax = Math.round(xMax);
    yMin = Math.round(yMin);
    yMax = Math.round(yMax);

    var xs = d3.scale.linear().domain([xMin, xMax]).range([whiteSpace, width - whiteSpace]);
    var ys = d3.scale.linear().domain([yMin, yMax]).range([350, 50]);

    return {
      ORIGIN_X: xs(0),
      ORIGIN_Y: ys(0),
      svgWidth: width,
      svgHeight: 400,
      xToSvgFactor: (width * 4 / 5) / (xMax - xMin),
      yToSvgFactor: 300 / (yMax - yMin),
      xScale: xs,
      yScale: ys
    };
  },

  render: function () {
    // draw the rectangles based on the sumType
    var rects = this._buildRects(this.props.data, this.props.rectHeights);
    // draw the interpolated line
    var line = this._buildLine(this.props.data, this.props.showLine);
    // draw the points
    var points = this._buildPoints(this.props.data);

    return (
      <svg id="graphSvg" width={this.state.svgWidth} height={this.state.svgHeight}>
        {rects}
        {line}
        {points}
        <g id="xAxisGroup" ref="xAxisGroup" className="axis" transform={'translate(0, '+this.state.ORIGIN_Y+')'}></g>
        <g id="yAxisGroup" ref="yAxisGroup" className="axis" transform={'translate('+this.state.ORIGIN_X+', 0)'}></g>
      </svg>
    );
  },

  _buildRects: function (data, heightArray) {
    var rects = [];
    for(var i = 0; i < heightArray.length; i++) {
      var neg = heightArray[i] < 0;
      var x = this.state.xScale(data[i][0]);
      var y = neg ? this.state.ORIGIN_Y : this.state.yScale(heightArray[i]);
      var width = this.state.xToSvgFactor * (data[i + 1][0] - data[i][0]);
      var height = Math.abs(heightArray[i] * this.state.yToSvgFactor);
      rects.push(
        <rect x={x} y={y} width={width} height={height} className={neg ? 'red' : 'blue'} />
      );
    }

    return rects;
  },

  _buildLine: function (data, showLine) {
    if (showLine) {
      var lineGenFn = d3.svg.line()
        .x(function (d) { return this.state.xScale(d[0]); })
        .y(function (d) { return this.state.yScale(d[1]); })
        .interpolate('linear');

      return (
        <path d={lineGenFn.call(this, data)}></path>
      );
    }
  },

  _buildPoints: function (data) {
    var points = [];

    for(var i = 0; i < data.length; i++) {
      var cx = this.state.xScale(data[i][0]);
      var cy = this.state.yScale(data[i][1]);
      points.push(
        <circle key={i} cx={cx} cy={cy} r="3" />
      );
    }

    return points;
  },

  _buildAxes: function () {
    // Drawing axes is done by D3 after the component is mounted or updated
    var xAxisFn = d3.svg.axis()
      .ticks(10)
      .tickSize(10, 1)
      .scale(this.state.xScale)
      .orient('bottom');

    var yAxisFn = d3.svg.axis()
      .ticks(6)
      .tickSize(10, 1)
      .scale(this.state.yScale)
      .orient('left');

    d3.select(this.refs.xAxisGroup).call(xAxisFn);
    d3.select(this.refs.yAxisGroup).call(yAxisFn);
  }
});

module.exports = GraphSvg;
