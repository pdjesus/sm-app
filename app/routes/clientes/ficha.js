import Ember from 'ember';

export default Ember.Route.extend({

  model(params) {
    return this.store.queryRecord('ficha', {cliente: params.cliente_id});
  },

  controllerName: 'fichas.form',

  renderTemplate(controller, model) {
    this.render('clientes.ficha', {into: 'secure', controller: controller });
  },

  actions: {

    addVenta(){
      Ember.Logger.debug("routes/clientes/ficha#addVenta");
      this.transitionTo('ventas.new', this.controller.model);
    }

  }

});
