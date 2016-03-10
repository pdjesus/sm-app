import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  ficha: DS.belongsTo('ficha'),
  producto: DS.belongsTo('producto'),
  talle: DS.belongsTo('talle-producto'),
  fechaVenta: DS.attr('date'),
  cantidad: DS.attr('number'),
  montoCosto: DS.attr('number'),
  interes: DS.attr('number'),
  descuento: DS.attr('number'),
  totalVenta: DS.attr('number'),
  formaPago: DS.attr('string'),
  cuotas: DS.hasMany('cuota'),

  totalConInteres: Ember.computed('totalVenta', 'interes', function(){
    return this.get('totalVenta') + ( this.get('totalVenta') * this.get('interes') / 100 );
  }),

  montoCuotas: Ember.computed.mapBy('cuotas', 'monto'),
  totalPagado: Ember.computed.sum('montoCuotas'),

  numberService: Ember.inject.service('number'),

  saldo: Ember.computed('totalConInteres', 'totalPagado', function(){ 
    return this.get('numberService').round(this.get('totalConInteres') - this.get('totalPagado'));
  })

});
