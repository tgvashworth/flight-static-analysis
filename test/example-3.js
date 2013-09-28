this.on('someNiceEvent', this.doAThing);
this.on('someOtherEvent', this.doADifferentThing);
this.on('someNiceEvent someOtherEvent', this.doADifferentThing);
this.on('click', this.doADifferentThing);
this.on('click mouseover', this.doADifferentThing);
this.on('click mouseout', this.doADifferentThing);
this.on('dblclick', this.doADifferentThing);
this.on('click', this.doADifferentThing);

this.trigger('somethingExciting', { some: 'stuff' });
this.trigger('click', { some: 'stuff' });
this.trigger('dblclick', { some: 'stuff' });
this.trigger('click', { some: 'stuff' });