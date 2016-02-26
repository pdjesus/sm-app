import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'tr',

  classNameBindings: ['isActive:info'],
  
  isActive: Ember.computed('attrs.data', 'attrs.selected', function(){
    Ember.Logger.debug(`Row selected: ${this.getAttr('selected')}`);
    return this.getAttr('data') === this.getAttr('selected');
  }),

  click() {
    this.sendAction('action', this.getAttr('data'));
  }


});
