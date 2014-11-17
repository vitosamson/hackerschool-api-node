'use strict';

/**
 * @class hackerschool.Client
 */
function Client() {
  this.token = null;

  this.people = require('./lib/people')(this);
  this.batches = require('./lib/batches')(this);
}

/**
 * Sets the token for the client instance to be used in API calls
 * @param {Object|String} token OAuth token to be used for API calls. This can be either a string with just the access token itself, or a token object returned from hackerschool.auth()
 */
Client.prototype.setToken = function(token) {
  this.token = token;
};

module.exports = {
  Client: Client,
  auth: require('./lib/auth')
};
