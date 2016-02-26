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

    this.store.findRecord('ficha', params.ficha_id).then(ficha => {
      Ember.Logger.debug(`Nueva venta para la ficha ${ficha.get('id')}`);
      model.set('ficha', ficha);
    });

    return model;
  },

  controllerName: 'ventas.form',

  renderTemplate: function(controller, model) {
    this.render('ventas.form', {into: 'secure', controller: controller });
  }

});
