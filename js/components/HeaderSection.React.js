var React = require('react/dist/react.min');

var HeaderSection = React.createClass({
  render: function () {
      return (
        <div id="headerSection" className="container-fluid">
          <div className="row">
            <div className="col-xs-12">
              <h2>Riemann</h2>
              <h5>Calculate and visualize Riemann Sums</h5>
            </div>
          </div>
        </div>
      );
  }
});

module.exports = HeaderSection;
