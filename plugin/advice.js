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

module.exports = function (file, node, data, argv) {
  if (u.isCallTo(node, '*', adviceMethods)) {
    if (!node.arguments) return;
    var advice = data.for('advice');
    node.arguments.slice(0, 1).forEach(function (arg) {
      var methods = advice.get(node.callee.property.name) || [];
      methods.push(u.objectName(arg));
      advice.for('summary').set(node.callee.property.name, _.unique(methods));
      if (argv.instances) {
        var instances = advice.get('instances') || [];
        instances.push({
          name: u.objectName(arg),
          method: node.callee.property.name,
          loc: node.loc
        });
        advice.set('instances', instances);
      }
    });
  }
};