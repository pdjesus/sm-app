import DS from 'ember-data';

export default DS.Model.extend({
  
  fechaCarga: DS.attr('date'),
  cliente: DS.belongsTo('cliente'),

  ventas: DS.hasMany('venta', {async: true}),
  pedidos: DS.hasMany('pedido', {async: true})

});
