var AppDispatcher = require('../dispatchers/AppDispatcher');
var Constants = require('../constants/Constants');

var MolarMassActions = {
  addPoint: function (x, y) {
    AppDispatcher.dispatch({
      actionType: Constants.ADD_POINT,
      x: x,
      y: y
    });
  },

  changeSumType: function (value) {
    AppDispatcher.dispatch({
      actionType: Constants.CHANGE_SUM_TYPE,
      value: value
    });
  },

  clear: function () {
    AppDispatcher.dispatch({
      actionType: Constants.CLEAR_DATA
    });
  },

  delete: function (index) {
    AppDispatcher.dispatch({
      actionType: Constants.DELETE_DATA_POINT,
      index: index
    });
  },

  randomize: function () {
    AppDispatcher.dispatch({
      actionType: Constants.RANDOMIZE_DATA
    });
  },

  toggleShowLine: function (value) {
    AppDispatcher.dispatch({
      actionType: Constants.TOGGLE_SHOW_LINE
    });
  },
};

module.exports = MolarMassActions;
