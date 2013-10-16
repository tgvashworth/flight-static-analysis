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

    this.after('initialize', function () {
      this.on('someoneNeedsMe', this.someNiceMethod);
      this.trigger('hereToHelp');
    });

    this.around('niceMixinMethod', function () {
      return this.someNiceMethod();
    });

    this.before('somethingTasty', function () {
      return this.eatIt();
    });

    this.before('aBadThing', function () {
      return this.doAGoodThing();
    });

  };

  return defineComponent(theThing, niceMixin)

});