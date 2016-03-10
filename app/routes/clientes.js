import Ember from 'ember';

export default Ember.Route.extend({
  
  model() {
    return this.store.findAll('cliente');
  },

  actions:{

    delete(item) {
      this.set('itemToDelete', item);
      $("#confirmRemoveCliente").modal();
    },

    confirmDelete() {
      this.get('itemToDelete').destroyRecord();
      this.set('itemToDelete', null);
      $("#confirmRemoveCliente").modal('hide');
    },

    filterBy(text) {
      this.controller.filterBy(text);
    }

  }


});
