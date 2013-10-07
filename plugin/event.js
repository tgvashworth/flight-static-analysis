/**
 * Events
 */
// Valid events
var eventMethods = {
  on: true,
  trigger: true
};

module.exports = function (file, node, data) {
  if (node.type === 'Literal' &&
      node.parent &&
      node.parent.type === 'CallExpression' &&
      node.parent.callee.property &&
      node.parent.callee.property.name in eventMethods) {
    node.value.split(' ').forEach(function (evName) {
      data.for('events').for(node.parent.callee.property.name).inc(evName);
    });
  }
};
