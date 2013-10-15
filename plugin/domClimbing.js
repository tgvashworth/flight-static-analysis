/**
 * DOM Climbing
 */
var u = require('../plugin-util');

var domMethods = [
  'parent',
  'parents',
  'closest'
];

module.exports = function (file, node, data) {
  if (u.isCallTo(node, '*', domMethods)) {
    data.inc('domClimbing');
  }
};