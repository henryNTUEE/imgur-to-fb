var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var Actions = require('../action');
var TopicStore = require('../stores/topic-store');
var Reflux = require('reflux');
var Avatar = require('../avatar');

module.exports = React.createClass({

  componentDidMount: function() {
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '964488406979366',
        cookie     : true,  // enable cookies to allow the server to access
                          // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.5' // use version 2.1
      });


      FB.getLoginStatus(function(response) {
        this.statusChangeCallback(response);
      }.bind(this));
    }.bind(this);

    // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  },

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  testAPI: function() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
    console.log('Successful login for: ' + response.name);
    document.getElementById('status').innerHTML =
      'Thanks for logging in, ' + response.name + '!';
    });
  },

  // This is called with the results from from FB.getLoginStatus().
  statusChangeCallback: function(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      this.testAPI();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
      'into Facebook.';
    }
  },

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  checkLoginState: function() {
    FB.getLoginStatus(function(response) {
      this.statusChangeCallback(response);
    }.bind(this));
  },

  handleClick: function() {
    FB.login(this.checkLoginState());
  },
  mixins: [
    Reflux.listenTo(TopicStore,'onChange')
  ],
  getInitialState: function(){
    return {
      topics: []
    }
  },
  componentWillMount: function(){
    Actions.getTopics();
  },
  render: function(){
    return <nav className="navbar navbar-default header">
      <div><Avatar username="100001194733381" /></div>
      <div className="container-fluid">

        <Link to="/" className="navbar-brand">
          My Imgur Browser
        </Link>
        <a href="#"  className="fb-login-button"  onClick={this.handleClick}>Login With FB</a>
        <div
          className="fb-like"
          data-share="true"
          data-width="450"
          data-show-faces="true">
       </div>
        <ul className = "nav navbar-nav navbar-right">
          {this.renderTopics()}
        </ul>
      </div>
    </nav>
  },
  renderTopics: function(){
    return this.state.topics.slice(0,5).map(function(topic){
      return <li key={topic.id}>

        <Link to={"topics/" + topic.id} activeClassName="active" >
          {topic.name}
        </Link>
      </li>
    });
  },
  onChange: function(event, topics){
    this.setState({
      topics: topics
    });
  }
});
