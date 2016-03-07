import Ember from 'ember';

export default Ember.Component.extend({

  addVenta: 'addVenta',
  deleteVenta: 'deleteVenta',
  addCuota: 'addCuota',
  deleteCuota: 'deleteCuota',
  updateInteres: 'updateInteres',
  saveVenta: 'saveVenta',

  cuotas: Ember.computed.alias('venta.cuotas'),

  hasSaldoPendiente: Ember.computed('venta.saldo', function(){
    return ( this.get('venta') ? this.get('venta.saldo') > 0 : false );
  }),

  cannotUpdateInteres: Ember.computed.not('hasSaldoPendiente'),

  isNotDirty: Ember.computed.not('venta.hasDirtyAttributes'),

  interes: Ember.computed('venta.interes', {
    get(){ return this.get('venta.interes'); },
    set(key, value){
      this.sendAction('updateInteres', this.get('venta'), value);
      return value;
    }
  }),

  actions: {

    selectVenta(venta) {
      this.set('venta', venta);
    },

    addVenta(){
      Ember.Logger.debug("panel-ventas#addVenta");
      this.sendAction('addVenta');
    },

    confirmDeleteVenta(venta) {
      this.send('selectVenta', venta);
      $('#confirmRemoveVenta').modal();
    }, 

    deleteVenta() {
      var venta = this.get('venta');
      this.set('venta', null);
      this.sendAction('deleteVenta', venta);
    },

    registrarCuota(){
      this.set('valorCuota', this.get('venta.saldo'));
      $('#registrarCuotaModal').modal();
    },    

    selectCuota(cuota) {
      this.set('cuota', cuota);
    },

    addCuota(){
      Ember.Logger.debug("panel-ventas#addCuota");
      this.sendAction('addCuota', this.get('venta'), this.get('valorCuota'));
    },

    confirmDeleteCuota(cuota) {
      this.send('selectCuota', cuota);
      $('#confirmRemoveCuota').modal();
    }, 

    deleteCuota() {
      var cuota = this.get('cuota');
      this.set('cuota', null);
      this.sendAction('deleteCuota', cuota);
    },

    saveVenta() {
      this.sendAction('saveVenta', this.get('venta'));
    }
  }

});
