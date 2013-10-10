/**
 * Events
 */
var u = require('../plugin-util');

// Valid events
var eventMethods = [
  'on',
  'trigger'
];

module.exports = function (file, node, data) {
  if (u.isCallTo(node, '*', eventMethods)) {
    if (!node.arguments) return;
    node.arguments.forEach(function (arg) {
      (arg.value || '').split(' ').forEach(function (evName) {
        if (!evName.length) return;
        data.for('events').for(node.callee.property.name).inc(evName);
      });
    });
  }
};