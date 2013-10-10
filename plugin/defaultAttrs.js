/**
 * Default Attributes
 */
var u = require('../plugin-util');
var _ = require('lodash');

module.exports = function (file, node, data) {
  if (u.isCallTo(node, 'this', 'defaultAttrs')) {
    var attrObj = node.arguments[0];
    if (!attrObj) return;
    if (!u.isObject(attrObj)) return;
    var keys = attrObj.properties.map(function (prop) {
      return prop.key.name;
    });
    var defaultAttrs = data.get('defaultAttrs') || [];
    data.set('defaultAttrs', _.unique(defaultAttrs.concat(keys)));
  }
};
