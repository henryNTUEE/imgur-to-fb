var Fetch = require('whatwg-fetch');
var rootUrl = 'https://api.imgur.com/3/';
var apiKey = 'c51122f1ef994a8';

module.exports = window.api = {
  get: function(url){
    return fetch(rootUrl + url,{
      headers: {
        'Authorization' : 'Client-ID '+apiKey
      }
    })
    .then(function(response){
      return response.json()
    })
    
  }
};
