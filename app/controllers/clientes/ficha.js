import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: ['venta'],

  venta: null,

  selectedVenta: Ember.computed('venta', function(){
    return (this.get('venta') ? this.get('model.ventas').findBy('id', this.get('venta')) : null);
  })

});
