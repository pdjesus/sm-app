import Ember from 'ember';

export default Ember.Route.extend({
  
  model: function() {
    return this.store.findAll('cliente');
  },

  actions:{

    delete: function(item) {
      this.set('itemToDelete', item);
      $("#confirmDeleteModal").modal();
    },

    confirmDelete: function() {
      this.get('itemToDelete').destroyRecord();
      this.set('itemToDelete', null);
      $("#confirmDeleteModal").modal('hide');
    },

    filterBy: function(text) {
      this.controller.filterBy(text);
    }

  }


});
