#! /usr/bin/env node

var fs = require('fs');
var argv = require('optimist').argv;

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
 * Recursive data score.
 */
var store = {
  init: function () {
    this._ = {};
    return this;
  },
  inc: function (id) {
    if (!this._[id]) this._[id] = 0;
    this._[id] += 1;
    return this;
  },
  dec: function (id) {
    if (!this._[id]) this._[id] = 0;
    this._[id] -= 1;
    return this;
  },
  set: function (id, amt) {
    this._[id] = amt;
    return this;
  },
  add: function (id) {
    this._[id] = this._[id] || Object.create(store).init();
    return this._[id];
  },
  for: function (id) {
    return this.add(id);
  },
  toObject: function () {
    return Object.keys(this._).reduce(function (memo, key) {
      memo[key] = (this._[key].toObject ? this._[key].toObject() : this._[key]);
      return memo;
    }.bind(this), {});
  },
  isEmpty: function () {
    return Object.keys(this._).length === 0;
  }
};

// Valid events
var eventMethods = {
  on: true,
  trigger: true
};

// Read the files & process them with falafel
var data = argv._.map(read).reduce(function (memo, file, i) {
  // Create a new store for this file
  var events = Object.create(store).init();

  // Depth-first traversal of the file's AST
  falafel(file, function (node) {
    if (node.type === 'Literal' &&
        node.parent &&
        node.parent.type === 'CallExpression' &&
        node.parent.callee.property &&
        node.parent.callee.property.name in eventMethods) {
      events.for(node.parent.callee.property.name).inc(node.value);
    }
  });

  // If we found some events, save it to our data
  if (!events.isEmpty()) memo[argv._[i]] = events.toObject();
  return memo;
}, {});

console.log(JSON.stringify(data, null, 2));
