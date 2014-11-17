'use strict';

function Client() {
  this.token = null;

  this.people = require('./lib/people')(this);
  this.batches = require('./lib/batches')(this);
}

Client.prototype.setToken = function(token) {
  this.token = token;
};

module.exports = {
  Client: Client,
  auth: require('./lib/auth')
};
