'use strict';

module.exports = function(client) {
  var utils = require('./utils')(client);

  var API_URL = 'https://www.hackerschool.com/api/v1/batches/';

  /**
   * List all the batches
   * @return {Promise} A promise that resolves with an array of batches
   */
  function list() {
    return utils.doAPICall(API_URL);
  }

  /**
   * Get information about a specific batch
   * @param  {String|Number} id Batch ID (can be gotten from batch.list())
   * @return {Promise}    A promise that resolves with the batch object
   */
  function batch(id) {
    var url = API_URL + id;

    return utils.doAPICall(url);
  }

  /**
   * Get a list of the hackerschools in a particular batch
   * @param  {String|Number} id Batach ID (can be gotten from batch.list())
   * @return {Promise}    A promise that resolves with an array of hackerschools in that batch
   */
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
