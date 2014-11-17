'use strict';

module.exports = function(client) {
  var utils = require('./utils')(client);

  var API_URL = 'https://www.hackerschool.com/api/v1/batches/';

  function list() {
    return utils.doAPICall(API_URL);
  }

  function batch(id) {
    var url = API_URL + id;

    return utils.doAPICall(url);
  }

  function people(id) {
    var url = API_URL + id + '/people';

    return utils.doAPICall(url);
  }

  return {
    list: list,
    batch: batch,
    people: people
  };
};
