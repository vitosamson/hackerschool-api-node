'use strict';

var Q = require('q'),
    simpleOAuth = require('simple-oauth2');

var HS_API_URL = 'https://www.recurse.com';

/**
 * @class Auth class constructor
 * @param {Object} config OAuth parameters
 * @param {String} config.client_id Client ID
 * @param {String} config.client_secret Client secret
 * @param {String} config.redirect_uri Redirect URI for OAuth callback
 */
function Auth(config) {
  if (!config || !config.client_id || !config.client_secret || !config.redirect_uri) {
    throw 'client_id, client_secret, site and redirect_uri are required';
  }

  this.oauthOpts = {
    clientID: config.client_id,
    clientSecret: config.client_secret,
    site: HS_API_URL,
    redirect_uri: config.redirect_uri
  };

  this.simpleOAuth = simpleOAuth(this.oauthOpts);
}

/**
 * Generates a URL that the resource owner needs to visit to authorize the app
 * @return {String} Authorization URL
 */
Auth.prototype.createAuthUrl = function() {
  return this.simpleOAuth.authCode.authorizeURL({
    redirect_uri: this.oauthOpts.redirect_uri
  });
};

/**
 * Makes a call to the access token endpoint with the given authorization code
 * @param  {String}   code     Authorization code
 * @param  {Function} [callback] Optional callback(err, token)
 * @return {Promise}            Promise that is resolved after token is retrieved or rejected if there's an error
 */
Auth.prototype.getToken = function(code, callback) {
  var deferred = Q.defer();

  this.simpleOAuth.authCode.getToken({
    code: code,
    redirect_uri: this.oauthOpts.redirect_uri
  }, function(err, response) {
    if (err){
      deferred.reject(new Error(err));

      if (callback)
        callback(err, null);
    } else {
      var token = this.simpleOAuth.accessToken.create(response);
      deferred.resolve(token);

      if (callback)
        return callback(null, token);
    }
  }.bind(this));

  return deferred.promise;
};

module.exports = function(config) {
  return new Auth(config);
};
