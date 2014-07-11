/**
 * Selectors
 */
var u = require('../plugin-util');

var domMethods = [
  'find',
  'children'
];

module.exports = function (file, node, data, argv) {
  if (u.isCallTo(node, '*', domMethods)) {
    var arg = node.arguments[0];
    if (!arg || node.arguments[1]) return;
    data.for('selectors').for('summary').inc(u.objectName(arg));
    if (argv.instances) {
      var instances = data.for('selectors').get('instances') || [];
      instances.push({
        selector: u.objectName(arg),
        loc: node.loc
      });
      data.for('selectors').set('instances', instances);
    }

  }
};