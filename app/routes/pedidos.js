import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    return this.store.query('pedido', {estado:'PENDIENTE'});
  },

  actions: {
    filterBy: function(text) {
      this.controller.filterBy(text);
    }
  }

});
