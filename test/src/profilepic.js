var React = require('react');

module.exports = React.createClass({
  render: function(){
    return  <img src={'https://graph.facebook.com/' + this.props.username + '/picture'} />
  }
});
