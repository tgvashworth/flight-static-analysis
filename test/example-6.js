this.defaultAttrs({
  somethingSelector: '.fish-cake',
  otherThingSelector: '#toasted-muffin',
});

this.aThing.face.$node.find('.js-something');
nose.aThing.face.$node.find('.js-something');

this.$node.find('.js-find');
this.$node.find('#js-find');
this.$node.children('.js-children');
this.$node.children('#js-children');
this.$element.children('#js-children');
this.$element.children('#js-children');

this.$node.parents('.js-parents');
this.$node.parents('#js-parents');
this.$node.closest('.js-closest');
this.$node.closest('#js-closest');

this.select('somethingSelector');

fish.kill('nose');
this.fish.kill('nose');
