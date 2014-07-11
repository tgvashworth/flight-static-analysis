/**
 * Required Attributes
 */
var u = require('../plugin-util');
var _ = require('lodash');

module.exports = function (file, node, data) {
  if (u.isCallTo(node, 'this', 'attributes')) {
    var attributes = data.for('attributes');
    var attrObj = node.arguments[0];
    if (!attrObj) return;
    if (!u.isObject(attrObj)) return;
    var keys = []
    attrObj.properties.forEach(function (prop) {
      if (!prop.value.value) keys.push(prop.key.name);
    });
    var reqAttrs = attributes.for('summary').get('required') || [];
    attributes.for('summary').set('required', _.unique(reqAttrs.concat(keys)));
  }
};
