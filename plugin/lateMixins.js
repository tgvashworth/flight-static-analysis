/**
 * Mixins late binding
 */
var u = require('../plugin-util');

module.exports = function (file, node, data, argv) {
  if (u.isCallTo(node, 'compose', 'mixin')) {
    var mixins = data.for('mixins');
    var arg = node.arguments[1];
    var mixinsList = [];
    arg.elements.forEach( function(element) {
        mixinsList.push(element.name);
    });
    var composeMixins = mixins.for('summary').for('composeMixins').get(u.objectName(node.arguments[0])) || [];
    composeMixins.push(mixinsList);
    mixins.for('summary').for('composeMixins').set(u.objectName(node.arguments[0]), composeMixins);
    if (argv.instances) {
        var instances = mixins.get('instances') || [];
        instances.push({
            name: u.objectName(node.arguments[0]),
            type: 'composeMixins',
            loc: node.loc
        });
        mixins.set('instances', instances);
    }
  }
  else if (u.isCallTo(node, '*', 'mixin')) {
    var mixins = data.for('mixins');
    var mixinsList = [];
    node.arguments.forEach( function(arg){
        mixinsList.push(arg.name);
    });
    var lateMixins = mixins.for('summary').for('lateMixins').get(u.objectName(node.callee.object)) || [];
    lateMixins.push(mixinsList);
    mixins.for('summary').for('lateMixins').set(u.objectName(node.callee.object), lateMixins);
    if (argv.instances) {
        var instances = mixins.get('instances') || [];
        instances.push({
            name: u.objectName(node.callee.object),
            type: 'lateMixins',
            loc: node.loc
        });
        mixins.set('instances', instances);
    }
  }
};
