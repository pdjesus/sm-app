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
  saldo: DS.attr('number'),
  formaPago: DS.attr('string'),
  cuotas: DS.hasMany('cuota')
});
