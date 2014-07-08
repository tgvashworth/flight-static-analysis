
var store = require('dirty-store');
var falafel = require('falafel');

/**
 * Grab a plugin
 */
var plugin = function (name) {
  return require('./plugin/' + name);
};

/**
 * Module exports one function that processes
 * code and returns data object of results.
 */
module.exports = function (code, opts) {
  // Create a new store for this file
  var data = Object.create(store).init();

  // Depth-first traversal of the file's AST
  falafel(code, { loc: true }, function (node) {
    opts.plugins.forEach(function (pluginName) {
      plugin(pluginName)(code, node, data, opts.argv);
    });
  });

  return data.toObject();
}