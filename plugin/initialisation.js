/**
 * Attach To Check
 */
var u = require('../plugin-util');
var _ = require('lodash');

module.exports = function (file, node, data, argv) {
  if (u.isCallTo(node, '*', 'attachTo')) {
    var attrObj = node.arguments[1];
    if (!attrObj) return;
    if (!u.isObject(attrObj)) return;
    var keys = attrObj.properties.map(function (prop) {
      return prop.key.name;
    });
    var init = data.for('initialisation');
    var caller = u.objectName(node.callee.object);
    var attachSummary = {
        initAttrs: keys
    };
    //if(data.for('initialisation').get('summary'))
    //    data.set('type', data.for('initialisation').get('summary').get('Column'));
    init.for('summary').set(caller, _.unique(init.for('summary').get(caller)).concat(attachSummary));
    if (argv.instances) {
        var instances = init.get('instances') || [];
        instances.push({
            caller: caller,
            initAttrs: keys,
            loc: node.loc
        });
        init.set('instances', instances);
    }
  }
};