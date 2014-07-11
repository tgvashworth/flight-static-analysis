/**
 * DOM Climbing
 */
var u = require('../plugin-util');

var domMethods = [
  'parent',
  'parents',
  'closest'
];

module.exports = function (file, node, data, argv) {
  if (u.isCallTo(node, '*', domMethods)) {
    var dom = data.for('domClimbing');
    dom.for('summary').inc('count');
    if (argv.instances) {
      var instances = dom.get('instances') || [];
      instances.push({
        loc: node.loc
      });
      dom.set('instances', instances);
    }
  }
};