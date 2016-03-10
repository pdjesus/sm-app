import Ember from 'ember';

export default Ember.Component.extend({

  select: 'select',
  save: 'save',
  remove: 'remove',

  field: 'texto',

  selectedItemObserver: Ember.observer('selectedItem', function(){
    this.set('texto', this.get(`selectedItem.${this.field}`));
  }),

  disableSaveButton: Ember.computed.empty('texto'),

  actions: {

    select(item) {
      this.sendAction('select', item);
    },

    add() {
      this.send('select', null);
    },

    save() {
      this.sendAction('save', this.get('texto'));
    },

    confirmRemove(item) {
      this.set('itemToRemove', item);
      this.$(`#${this.get('confirmRemoveId')}`).modal();
    },

    remove() {
      this.sendAction('remove', this.get('itemToRemove'));
      this.set('itemToRemove', null);
      this.$(`#${this.get('confirmRemoveId')}`).modal('hide');
    }

  }
});
