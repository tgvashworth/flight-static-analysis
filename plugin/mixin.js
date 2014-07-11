/**
 * Mixins
 */
var u = require('../plugin-util');
var _ = require('lodash');

module.exports = function (file, node, data, argv) {
  if (u.isCallTo(node, 'defineComponent')) {
    node.arguments.slice(1).forEach(function (arg) {
      var mixins = data.for('mixins');
      var mixinsList = mixins.for('summary').for('mixins').get(u.objectName(node.arguments[0])) || [];
      mixinsList.push(u.objectName(arg));
      //var mixins = data.get('mixins') || [];
      //mixins.push(u.objectName(arg));
      //data.set('mixins', mixins);
      mixins.for('summary').for('mixins').set(u.objectName(node.arguments[0]), mixinsList);

      if (argv.instances) {
          var instances = mixins.get('instances') || [];
          instances.push({
              name: u.objectName(node.arguments[0]),
              type: 'mixins',
              loc: node.loc
          });
          mixins.set('instances', instances);
      }
    });
  }
};
