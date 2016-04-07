var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events');
// var Constants = require('../constants/Constants');

var _dataPoints = [];
var _sumType = 'LEFT';

var RiemannStore = Object.create(EventEmitter.prototype, {

});

module.exports = RiemannStore;
