var _ = require('lodash');

/**
 * Methods
 */
var functionDeclarations = {};
var functions = {};

var getNameFromNode = function (node) {
  // Support this['b'] syntax
  if (node.type === 'Literal') return node.value;
  return node.name;
};

/**
 * this.x =
 */

var isNodeThisDot = function (node) {
  if (!node) return false;
  return (node.type === 'ExpressionStatement' &&
          node.expression &&
          node.expression.type === 'AssignmentExpression' &&
          node.expression.left &&
          node.expression.left.type === 'MemberExpression' &&
          node.expression.left.object &&
          node.expression.left.object.type === 'ThisExpression');
};

var tryIsDot = function (file, node, data) {
  var right = node.expression.right;
  if (!(right && right.type)) return;

  var isFunctionExpression = (right.type === 'FunctionExpression');
  var isFunction = (isFunctionExpression ||
                    (right.type === 'Identifier' &&
                    functionDeclarations[right.name]));
  if (!isFunction) return;

  var left = node.expression.left;
  if (!left.property) return;

  var name = getNameFromNode(left.property);

  var methods = data.get('methods') || [];
  methods.push(name);
  data.set('methods', _.unique(methods));
};

/**
 * x.bind(...)
 */

var isNodeSomethingDotBind = function (node) {
  return (node.type === 'CallExpression' &&
          node.callee &&
          node.callee.property &&
          node.callee.property.name === 'bind' &&
          node.callee.object);
};

var tryIsSomethingDotBind = function (file, node, data) {
  var parent = node.parent;
  if (!parent ||
      !parent.parent) return;
  var grandparent = parent.parent;
  if (!grandparent ||
      !grandparent.expression ||
      !grandparent.expression.left ||
      !grandparent.expression.left.property) return;
  var name = getNameFromNode(grandparent.expression.left.property);

  var methods = data.get('methods') || [];
  methods.push(name);
  data.set('methods', _.unique(methods));
};

module.exports = function (file, node, data) {
  // function declarations
  if (node.type === 'FunctionDeclaration' &&
      node.id &&
      node.id.name) {
    functionDeclarations[node.id.name] = true;
  }

  // this.something
  // this['something']
  if (isNodeThisDot(node)) {
    tryIsDot(file, node, data);
  }

  // Find something.bind and make sure it's saved
  if (isNodeSomethingDotBind(node)) {
    tryIsSomethingDotBind(file, node, data);
  }
};
