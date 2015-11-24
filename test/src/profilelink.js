var React = require('react');

module.exports = React.createClass({
  render: function(){
  return  <a href={'https://www.facebook.com/' + this.props.username}>
        {this.props.username}
    </a>
  }
});
