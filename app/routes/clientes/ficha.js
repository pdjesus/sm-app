import Ember from 'ember';

export default Ember.Route.extend({

  model(params) {
    return this.store.queryRecord('ficha', {cliente: params.cliente_id});
  },

  // https://guides.emberjs.com/v2.4.0/routing/query-params/#toc_sticky-query-param-values
  resetController(controller, isExiting, transition) {
    if (isExiting) {
      controller.set('venta', null);
    }
  },  

  renderTemplate(controller, model) {
    this.render('clientes.ficha', {into: 'secure', controller: controller });
  },

  actions: {

    addVenta(){
      Ember.Logger.debug("routes/clientes/ficha#addVenta");
      this.transitionTo('ventas.new', this.get('controller.model.id'));
    },

    addCuota(venta, monto) {
      Ember.Logger.debug(`Registrar Cuota: ${monto}`);

      var cuota = this.store.createRecord('cuota', {
        venta: venta,
        ficha: this.get('controller.model'),
        monto: monto,
        fechaCuota: new Date()
      });

      cuota.save();
      
    },

    deleteVenta(venta) {
      venta.destroyRecord();
    },

    deleteCuota(cuota) {
      cuota.destroyRecord();
    },

    updateInteres(venta, interes) {
      Ember.Logger.debug(`routes/clientes/ficha#updateInteres(${venta.id}, ${interes})`);
      venta.set('interes', interes);
    },

    saveVenta(venta) {
      return venta.save();
    }

  }

});
