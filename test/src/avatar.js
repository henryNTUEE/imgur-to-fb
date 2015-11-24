var React = require('react');
var ProfilePic = require('./profilepic');
var ProfileLink = require('./profilelink');

module.exports = React.createClass({
  render: function(){

  return <div>
        <ProfilePic username={this.props.username} />
        <ProfileLink username={this.props.username} />
   </div>
  }
});
