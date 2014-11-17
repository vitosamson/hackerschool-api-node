'use strict';

module.exports = function(client) {
  var utils = require('./utils')(client);

  var API_URL = 'https://www.hackerschool.com/api/v1/people/';

  function person(id) {
    var url = API_URL + id;

    return utils.doAPICall(url);
  }

  function me() {
    var url = API_URL + 'me';

    return utils.doAPICall(url);
  }

  return {
    person: person,
    me: me
  };
};
