import Ember from 'ember';

export default Ember.Route.extend({

  model(params) {
    var model = this.store.createRecord('venta', {
      fechaVenta: new Date(), 
      cantidad: 1,
      interes: 0,
      descuento: 0,
      saldo: 0,
      formaPago: 'CONTADO'
    });

    this.store.findRecord('ficha', params.ficha_id).then(ficha => model.set('ficha', ficha));

    return model;
  },

  controllerName: 'ventas.form',

  renderTemplate: function(controller, model) {
    this.render('ventas.edit', {into: 'secure', controller: controller });
  }

});
