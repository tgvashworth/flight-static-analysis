/**
 * Counting New Attributes Usage
 */
var u = require('../plugin-util');

module.exports = function (file, node, data, argv) {
  if (u.isCallTo(node, 'this', 'attributes')) {
    var attributes = data.for('attributes');
    attributes.for('summary').inc('count');
    if (argv.instances) {
        var instances = attributes.get('instances') || [];
        instances.push({
            name: 'attributes',
            loc: node.loc
        });
        attributes.set('instances', instances);
    }
  }
};