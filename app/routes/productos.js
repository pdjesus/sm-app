import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel() {
    return Ember.RSVP.all([
      this.store.findAll('categoria'),
      this.store.findAll('tipo-producto'),
      this.store.findAll('marca-producto')
    ]);
  },

  model: function() {
    return this.store.findAll('producto');
  }

});
