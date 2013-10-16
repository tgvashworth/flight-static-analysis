/**
 * Name
 */
var u = require('../plugin-util');

module.exports = function (file, node, data) {
  if (u.isCallTo(node, 'defineComponent')) {
    node.arguments.slice(0, 1).forEach(function (arg) {
      data.set('name', u.objectName(arg));
    });
  }
};
