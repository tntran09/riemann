var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events');
require('../object-assign');
var Constants = require('../constants/Constants');

var CHANGE_EVENT = 'change';

var _dataPoints = [
  [0, 7.5], [4, 9], [8, 9.3], [12, 9.5], [16, 8.8], [20, 8], [24, 7.2]
]; // clear default data after building input
var _sumType = 'Upper';
var _rectHeights = [];
var _totalRiemannSum = 0.0;
var _lineType = ''; // linear, basis, etc.
var _inputX = '';
var _inputY = '';
recalculateSum(); // TODO: remove after clearing default data

function changeSumType(value) {
  _sumType = value
  recalculateSum();
}

function deleteDataPoint(index) {
  _dataPoints.splice(index, 1);
  recalculateSum();
}

function recalculateSum() {
  _rectHeights = [];
  _totalRiemannSum = 0;
  var numberOfRectangles = _dataPoints.length - 1;
  var fn = chooseHeightFn();
  for(var i = 0; i < numberOfRectangles; i++) {
    var h = fn(_dataPoints[i][1], _dataPoints[i + 1][1]);
    _rectHeights[i] = h;
    _totalRiemannSum += h * (_dataPoints[i + 1][0] - _dataPoints[i][0]);
  }

  _totalRiemannSum = Math.round(_totalRiemannSum * 1000000) / 1000000;
}

function chooseHeightFn() {
  switch(_sumType) {
    case 'Upper':
      return function (leftValue, rightValue) { return Math.max(leftValue, rightValue); };
    case 'Lower':
      return function (leftValue, rightValue) { return Math.min(leftValue, rightValue); };
    case 'Left':
      return function (leftValue, rightValue) { return leftValue; };
    case 'Right':
      return function (leftValue, rightValue) { return rightValue; };
    case 'Midpoint':
      return function (leftValue, rightValue) { return (leftValue + rightValue) / 2; };
  }
}

var RiemannStore = Object.assign({}, EventEmitter.prototype, {
  getAppState: function () {
    return {
      dataPoints: _dataPoints,
      rectHeights: _rectHeights,
      sumType: _sumType,
      totalRiemannSum: _totalRiemannSum
    };
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function (action) {
  switch(action.actionType) {
    // case Constants.ADD_POINT:
    //   addToHistory('something');
    //   RiemannStore.emitChange();
    //   break;
    case Constants.CHANGE_SUM_TYPE:
      changeSumType(action.value);
      RiemannStore.emitChange();
      break;
    case Constants.DELETE_DATA_POINT:
      deleteDataPoint(action.index);
      RiemannStore.emitChange();
      break;
    default: // noop
  }
});

module.exports = RiemannStore;
