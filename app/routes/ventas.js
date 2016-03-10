import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    return this.store.query('venta', {pendientes: 1});
  },

  actions: {

    filterBy: function(text) {
      this.controller.filterBy(text);
    }
    
  }

});