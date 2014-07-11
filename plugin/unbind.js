/**
 * Unbind Events
 */
var u = require('../plugin-util');

// Valid events
var eventMethods = [
  'off',
  'unbind'
];

module.exports = function (file, node, data, argv) {
  if (u.isCallTo(node, '*', eventMethods)) {
    if (!node.arguments) return;
    var events = data.for('events');
    node.arguments.forEach(function (arg) {
      var argVal = (arg.value || arg.name || '');
      if(typeof argVal !== 'string') argVal = argVal.toString();
      argVal = (argVal.split(' ') || arg.source());
      argVal.forEach(function (evName) {
        if (!evName.length) return;
        events.for('summary').for(node.callee.property.name).inc(evName);
        if (argv.instances) {
          var instances = events.get('instances') || [];
          instances.push({
            name: evName,
            method: node.callee.property.name,
            loc: node.loc
          });
          events.set('instances', instances);
        }
      });
    });
  }
};