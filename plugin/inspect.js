var stringify = require('json-stringify-safe');

module.exports = function (file, node, data) {
  if (!node.parent) {
    data.for('inspect').set(JSON.parse(stringify(node)));
  }
};