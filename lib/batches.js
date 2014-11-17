'use strict';

var utils = require('./utils');

var API_URL = 'https://www.hackerschool.com/api/v1/batches/';

function list(token) {
  return utils.doAPICall(API_URL, token);
}

function batch(id, token) {
  var url = API_URL + id;

  return utils.doAPICall(url, token);
}

function people(id, token) {
  var url = API_URL + id + '/people';

  return utils.doAPICall(url, token);
}

module.exports = {
  list: list,
  batch: batch,
  people: people
};
