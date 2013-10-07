/**
 * Dependencies
 */
module.exports = function (file, node, data) {
  if (node.type === 'CallExpression' &&
      node.callee &&
      node.callee.name === 'define' &&
      node.arguments[0] &&
      node.arguments[0].type === 'ArrayExpression') {
    node.arguments[0].elements.forEach(function (elem) {
      if (elem.type !== 'Literal') return;
      var dependencies = data.get('dependencies') || [];
      dependencies.push(elem.value);
      data.set('dependencies', dependencies);
    });
  }
};