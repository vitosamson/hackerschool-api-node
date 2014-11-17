'use strict';

module.exports = function(client) {
  var utils = require('./utils')(client);

  var API_URL = 'https://www.hackerschool.com/api/v1/people/';

  /**
   * Get information about a specific hackerschooler
   * @param  {String|Number} id Person ID (can be gotten from batches.people())
   * @return {Promise}    A promise that resolves with the person object
   */
  function person(id) {
    var url = API_URL + id;

    return utils.doAPICall(url);
  }

  /**
   * Get information on the currently authorized hackerschooler
   * @return {Promise} A promise that resolves with the person object
   */
  function me() {
    var url = API_URL + 'me';

    return utils.doAPICall(url);
  }

  return {
    person: person,
    me: me
  };
};
