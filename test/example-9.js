define([
  'flight/lib/component'
], function (defineComponent) {

  var niceMixin = require('nice/mixin');

  var theThing = function theThing() {

    this.defaultAttrs({
      name: 'boris',
      likes: ['cake', 'toast']
    });

    this.someNiceMethod = function () {
      return 'no.';
    };

  };

  return defineComponent(theThing, niceMixin)

});