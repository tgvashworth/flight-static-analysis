/**
 * Required Attributes
 */
var u = require('../plugin-util');
var _ = require('lodash');

module.exports = function (file, node, data) {
  if (u.isCallTo(node, 'this', 'defaultAttrs')) {
    var defAttrs = data.for('defaultAttrs');
    var attrObj = node.arguments[0];
    if (!attrObj) return;
    if (!u.isObject(attrObj)) return;
    var keys = []
    attrObj.properties.forEach(function (prop) {
      if (!prop.value.value) keys.push(prop.key.name);
    });
    var reqAttrs = defAttrs.for('summary').get('required');
    defAttrs.for('summary').set('required', _.unique(reqAttrs).concat(keys));
  }
};
