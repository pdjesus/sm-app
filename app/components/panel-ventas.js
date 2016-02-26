import Ember from 'ember';

export default Ember.Component.extend({

  addVenta: 'addVenta',

  cuotas: Ember.computed.alias('venta.cuotas'),

  hasSaldoPendiente: Ember.computed('venta.saldo', function(){
    return ( this.get('venta') ? this.get('venta.saldo') > 0 : false );
  }),

  actions: {

    selectVenta(venta) {
      this.set('venta', venta);
    },

    addVenta(){
      Ember.Logger.debug("panel-ventas#addVenta");
      this.sendAction('addVenta');
    }

  }

});
