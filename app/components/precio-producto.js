import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['panel', 'panel-default'],

  updatePrecioCosto: 'updatePrecioCosto',
  updatePorcentaje: 'updatePorcentaje',

  didInitAttrs() {
    this.set('showFullInformation', this.getAttr('producto').get('isNew'));
  },

  precioCosto: Ember.computed('model.precioCosto', {
    get() { return this.get('model.precioCosto'); },
    set(key, value) {
      this.sendAction('updatePrecioCosto', value);
      return value;
    }
  }),

  porcentaje: Ember.computed('model.porcentaje', {
    get() { return this.get('model.porcentaje'); },
    set(key, value) {
      this.sendAction('updatePorcentaje', value);
      return value;
    }
  }),

  precioVenta: Ember.computed('precioCosto', 'porcentaje', {
    get(){ return Math.round(parseFloat(this.get('precioCosto')) + (this.get('precioCosto') * this.get('porcentaje') / 100), 2); }, 
    set(key, value) {
      this.set('precioCosto', Math.round(value / (1 + this.get('porcentaje') / 100), 2));
      return value;
    }
  }),

  ganancia: Ember.computed('precioCosto', 'precioVenta', function(){
    return Math.round(this.get('precioVenta') - this.get('precioCosto'), 2);
  })

});
