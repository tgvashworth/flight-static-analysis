/**
 * Selectors
 */
var u = require('../plugin-util');

var domMethods = [
  'find',
  'children'
];

module.exports = function (file, node, data) {
  if (u.isCallTo(node, '*', domMethods)) {
    var arg = node.arguments[0];
    if (arg.type !== 'Literal') return;
    arg.value.split(',').forEach(function (event) {
      data.for('selectors').inc(event.trim());
    });
  }
};