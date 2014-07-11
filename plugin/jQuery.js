/**
 * jQuery
 */
var u = require('../plugin-util');
var _ = require('lodash');

module.exports = function (file, node, data, argv) {
  var jQuery = data.for('jQuery');
  if (u.isCallTo(node, '$', '*')) {
    jQuery.for('summary').for('dot').inc(u.objectName(node.callee.property));
    if (argv.instances){
      var instances = jQuery.get('instances') || [];
      instances.push({
        type: 'dot',
        name: u.objectName(node.callee.property),
        loc: node.loc
      });
      jQuery.set('instances', instances);
    }
  }
  else if(u.isCallTo(node, '$')) {
    jQuery.for('summary').for('main').inc(u.objectName(node.arguments[0]));
    if (argv.instances){
      var instances = jQuery.get('instances') || [];
      instances.push({
        type: 'main',
        name: u.objectName(node.arguments[0]),
        loc: node.loc
      });
      jQuery.set('instances', instances);
    }
  }
  else if(u.isCallWith(node, '$')) {
    var obj = node;
    while(obj && obj.type === 'CallExpression' && obj.callee.object) obj = obj.callee.object;
    if(!(u.isCallWith(obj, '$', '*') || u.isCallWith(obj, '$'))) {
      jQuery.for('summary').for('rest').for(u.objectName(obj)).inc(u.objectName(node.callee.property));
      if (argv.instances){
        var instances = jQuery.get('instances') || [];
        instances.push({
          type: 'rest',
          name: u.objectName(obj),
          method: u.objectName(node.callee.property),
          loc: node.loc
        });
        jQuery.set('instances', instances);
      }
    }
  }
};