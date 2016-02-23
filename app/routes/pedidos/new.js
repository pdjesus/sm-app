import Ember from 'ember';

export default Ember.Route.extend({
  
  model: function() {
    return this.store.createRecord('pedido', { fechaPedido: new Date(), cantidad: 1});
  },

  controllerName: 'pedidos.edit',

  renderTemplate: function(controller, model) {
    this.render('pedidos.edit', {into: 'secure', controller: controller });
  }

});
