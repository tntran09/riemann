var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events');
require('../object-assign');
var Constants = require('../constants/Constants');

var CHANGE_EVENT = 'change';

var _dataPoints = [
  [0, 7.5], [4, 9], [8, 9.3], [12, 9.5], [16, 8.8], [20, 8], [24, 7.2]
]; // clear default data after building input
var _sumType = 'Upper';
// var rectAreas = [], totalRiemannSum = 0.0;
var _lineType = ''; // linear, basis
var _inputX = '';
var _inputY = '';

function changeSumType(value) {
  _sumType = value
  // recalculate sum
}

function deleteDataPoint(index) {
  _dataPoints.splice(index, 1);
  // recalculate sum
}

var RiemannStore = Object.assign({}, EventEmitter.prototype, {
  getDataPoints: function () {
      return _dataPoints;
  },

  getSumType: function () {
    return _sumType;
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
