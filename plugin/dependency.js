/**
 * Dependencies
 */
var u = require('../plugin-util');

module.exports = function (file, node, data, argv) {
  if (u.isCallTo(node, ['define', 'require']) &&
      node.arguments[0] &&
      node.arguments[0].type === 'ArrayExpression') {
    node.arguments[0].elements.forEach(function (elem) {
      if (elem.type !== 'Literal') return;
      var dependencies = data.get('dependencies') || [];
      dependencies.push(elem.value);
      data.set('dependencies', dependencies);
    });
  }
  if (u.isCallTo(node, 'require') &&
      node.arguments[0] &&
      node.arguments[0].type === 'Literal') {
    var dependencies = data.get('dependencies') || [];
    dependencies.push(node.arguments[0].value);
    data.set('dependencies', dependencies);
  }
};