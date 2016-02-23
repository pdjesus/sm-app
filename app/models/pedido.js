import DS from 'ember-data';

export default DS.Model.extend({

  ficha: DS.belongsTo('ficha'),
  compra: DS.belongsTo('compra'),
  detalle: DS.belongsTo('detalle'),
  producto: DS.belongsTo('producto'),
  talle: DS.belongsTo('talle-producto'),
  fechaPedido: DS.attr('date'),
  cantidad: DS.attr('number'),
  entrega: DS.attr('number'),
  estado: DS.attr('string', {defaultValue: 'PENDIENTE'})

});
