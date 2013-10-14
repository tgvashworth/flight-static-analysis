/**
 * Mixins
 */
var u = require('../plugin-util');

module.exports = function (file, node, data) {
  if (u.isCallTo(node, 'defineComponent')) {
    node.arguments.slice(1).forEach(function (arg) {
      var mixins = data.get('mixins') || [];
      mixins.push(u.objectName(arg));
      data.set('mixins', mixins);
    });
  }
};
