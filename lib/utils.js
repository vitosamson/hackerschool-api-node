'use strict';

module.exports = function(client) {

  var request = require('request'),
      Q = require('q');

  function doAPICall(url) {
    var deferred = Q.defer();

    verifyAndReturnToken()
    .then(function(token) {
      request.get(url, {
        auth: {
          bearer: token
        },
        json: true
      }, function(err, response, body) {
        if (err)
          deferred.reject(err);
        else if (response.statusCode !== 200)
          deferred.reject(response.statusCode + ': ' + body.message);
        else
          deferred.resolve(body);
      });
    }, function(err) {
      deferred.reject(err);
    });

    return deferred.promise;
  }

  function verifyAndReturnToken() {
    var deferred = Q.defer(),
        token = client.token;

    if (typeof token === 'object' && token.expired) {
      if (token.expired()) {
        token.refresh(function(err, result) {
          if (err){
            deferred.reject('Error refreshing token: ' + err);
          }
          else {
            deferred.resolve(result.token.access_token);
            client.setToken(result);
          }
        });
      } else {
        deferred.resolve(token.token.access_token);
      }
    }
    else {
      deferred.resolve(token);
    }

    return deferred.promise;
  }

  return {
    doAPICall: doAPICall
  };

};
