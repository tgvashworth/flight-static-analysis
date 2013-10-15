/**
 * jQuery
 */
var u = require('../plugin-util');

module.exports = function (file, node, data) {
  if (u.isCallTo(node, '$')) {
    data.inc('jQuery');
  }
};