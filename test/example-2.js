this.on('someNiceEvent', this.doAThing);
this.on('someOtherEvent', this.doADifferentThing);

this.trigger('somethingExciting', {
  some: 'stuff'
});