/**
 * Mixins
 */
module.exports = function (file, node, data) {
  if (node.type === 'CallExpression' &&
      node.callee &&
      node.callee.name === 'defineComponent') {
    node.arguments.slice(1).forEach(function (arg) {
      var mixins = data.get('mixins') || [];
      mixins.push(arg.name);
      data.set('mixins', mixins);
    });
  }
};
