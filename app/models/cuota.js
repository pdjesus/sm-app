import DS from 'ember-data';

export default DS.Model.extend({
  
  ficha: DS.belongsTo('ficha'),
  venta: DS.belongsTo('venta'),
  fechaCuota: DS.attr('date'),
  monto: DS.attr('number'),
  impresa: DS.attr('boolean', {defaultValue: false})

});
