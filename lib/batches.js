'use strict';

var Q = require('q'),
    request = require('request');

var API_URL = 'https://www.hackerschool.com/api/v1/batches/';

function list(token) {
  var deferred = Q.defer();

  // If we're being passed the token object from hackerschool.auth.getToken(), we need to pull the actual access_token from the object
  if (typeof token === 'object') {
    if (token.token.access_token)
      token = token.token.access_token;
  }

  request.get(API_URL, {
    auth: {
      bearer: token
    },
    json: true
  }, function(err, response, body){
    if (err)
      deferred.reject(err);
    else if (response.statusCode !== 200)
      deferred.reject(response.statusCode + ': ' + body.message);
    else
      deferred.resolve(body);
  });

  return deferred.promise;
}

function batch(id, token) {
  var deferred = Q.defer();

  // If we're being passed the token object from hackerschool.auth.getToken(), we need to pull the actual access_token from the object
  if (typeof token === 'object') {
    if (token.token.access_token)
      token = token.token.access_token;
  }

  request.get(API_URL + id, {
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

function people(id, token) {
  var deferred = Q.defer();

  // If we're being passed the token object from hackerschool.auth.getToken(), we need to pull the actual access_token from the object
  if (typeof token === 'object') {
    if (token.token.access_token)
      token = token.token.access_token;
  }

  request.get(API_URL + id + '/people', {
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

module.exports = {
  list: list,
  batch: batch,
  people: people
};
