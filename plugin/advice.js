/**
 * Advice
 */
var u = require('../plugin-util');
var _ = require('lodash');

// Valid advice methos
var adviceMethods = [
  'before',
  'after',
  'around'
];

module.exports = function (file, node, data) {
  if (u.isCallTo(node, '*', adviceMethods)) {
    if (!node.arguments) return;
    var advice = data.for('advice');
    node.arguments.slice(0, 1).forEach(function (arg) {
      var methods = advice.get(node.callee.property.name) || [];
      methods.push(u.objectName(arg));
      advice.set(node.callee.property.name, _.unique(methods));
    });
  }
};