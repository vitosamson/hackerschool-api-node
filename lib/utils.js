'use strict';

var request = require('request'),
    Q = require('q');

function doAPICall(url, token) {
  var deferred = Q.defer();

  token = transformToken(token);

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

  return deferred.promise;
}

function transformToken(token) {
  if (typeof token === 'object' && token.token.access_token)
    return token.token.access_token;
  else
    return token;
}

module.exports = {
  doAPICall: doAPICall
};
