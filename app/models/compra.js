import DS from 'ember-data';

export default DS.Model.extend({
  fechaCompra: DS.attr('date'),
  total: DS.attr('number'),
  descuento: DS.attr('number'),
  detalles: DS.hasMany('detalle')
});
