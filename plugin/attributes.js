/**
 * Attributes
 */
var u = require('../plugin-util');
var _ = require('lodash');

module.exports = function (file, node, data) {
  if (u.isCallTo(node, 'this', 'attributes')) {
    var attributes = data.for('attributes');
    var attrObj = node.arguments[0];
    if (!attrObj) return;
    if (!u.isObject(attrObj)) return;
    var keys = attrObj.properties.map(function (prop) {
      return prop.key.name;
    });
    var attrs = attributes.for('summary').get('list') || [];
    attributes.for('summary').set('list', _.unique(attrs.concat(keys)));
  }
};
