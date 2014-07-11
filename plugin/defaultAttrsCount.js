/**
 * Counting Default Attributes Usage
 */
var u = require('../plugin-util');

module.exports = function (file, node, data, argv) {
  if (u.isCallTo(node, 'this', 'defaultAttrs')) {
    var attributes = data.for('defaultAttrs');
    attributes.for('summary').inc('count');
    if (argv.instances) {
        var instances = attributes.get('instances') || [];
        instances.push({
            name: 'defaultAttrs',
            loc: node.loc
        });
        attributes.set('instances', instances);
    }
  }
};