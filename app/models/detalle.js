import DS from 'ember-data';

export default DS.Model.extend({
  compra: DS.belongsTo('compra'),
  producto: DS.belongsTo('producto'),
  talle: DS.belongsTo('talle'),
  cantidad: DS.attr('number'),
  precioCosto: DS.attr('number')
});
