#!/usr/bin/env node

var fs = require('fs');
var argv = require('optimist').argv;
var through = require('through');
var store = require('dirty-store');
var _ = require('lodash');

var falafel = require('falafel');

/**
 * Read a file with utf-8 encoding.
 * TODO make this a bound-right fn: fs.readFileSync.bindRight(fs, { ... })?
 */
var read = function (f) {
  return fs.readFileSync(f, {
    encoding: 'utf-8'
  });
};

/**
 * Grab a plugin
 */
var plugin = function (name) {
  try {
    return require('./plugin/' + name);
  } catch (e) {
    return function (file, node, data) {
      data.set('error', 'Missing plugin "' + name + '"');
    };
  }
};

/**
 * Default plugins.
 * TODO make this come from args
 */
var plugins = [
  // 'inspect',
  'event',
  'mixin',
  'dependency',
  'method',
  'defaultAttrs',
  'selector',
  'domClimbing',
];

var processFile = function (file) {
  // Create a new store for this file
  var data = Object.create(store).init();

  // Depth-first traversal of the file's AST
  falafel(file, function (node) {
    plugins.forEach(function (pluginName) {
      plugin(pluginName)(file, node, data);
    });
  });

  return data.toObject();
};

var output = function (name, data) {
  return JSON.stringify({
    name: name,
    data: data
  }) + '\n';
};

process.stdin.pipe(through(function (filenames) {

  // Produce an array of useful filenames
  var filteredNames =
    filenames
      .toString()
      .split('\n')
      .filter(function (f) { return !!f.length; });

  // Read & process each file, then queue the resulte
  filteredNames
    .map(read)
    .map(processFile)
    .filter(function (v) { return !!v; })
    .forEach(function (result, i) {
      this.queue(output(filteredNames[i], result));
    }.bind(this));

})).pipe(process.stdout);
