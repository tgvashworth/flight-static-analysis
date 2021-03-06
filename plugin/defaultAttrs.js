/**
 * Default Attributes
 */
var u = require('../plugin-util');
var _ = require('lodash');

module.exports = function (file, node, data) {
  if (u.isCallTo(node, 'this', 'defaultAttrs')) {
    if (!node.arguments) return;
    var defAttrs = data.for('defaultAttrs');
    var attrObj = node.arguments[0];
    if (!attrObj) return;
    if (!u.isObject(attrObj)) return;
    var keys = attrObj.properties.map(function (prop) {
      return prop.key.name;
    });
    var defaultAttrs = defAttrs.for('summary').get('list') || [];
    defAttrs.for('summary').set('list', _.unique(defaultAttrs.concat(keys)));
  }
};
