var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events');
require('../object-assign');
// var Constants = require('../constants/Constants');

var CHANGE_EVENT = 'change';

var _dataPoints = [
  [0, 7.5], [4, 9], [8, 9.3], [12, 9.5], [16, 8.8], [20, 8], [24, 7.2]
]; // clear default data after building input
var _sumType = 'LEFT';
// var rectAreas = [], totalRiemannSum = 0.0;
var _lineType = ''; // linear, basis
var _inputX = '';
var _inputY = '';

var RiemannStore = Object.assign({}, EventEmitter.prototype, {
  getDataPoints: function () {
      return _dataPoints;
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
    default: // noop
  }
});

module.exports = RiemannStore;
