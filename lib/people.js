'use strict';

var utils = require('./utils');

var API_URL = 'https://www.hackerschool.com/api/v1/people/';

function person(id, token) {
  var url = API_URL + id;

  return utils.doAPICall(url, token);
}

function me(token) {
  var url = API_URL + 'me';

  return utils.doAPICall(url, token);
}

module.exports = {
  person: person,
  me: me
};
