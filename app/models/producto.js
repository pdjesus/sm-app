import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  
  codigo: DS.attr('string'),
  texto: DS.attr('string'),
  
  categoria: DS.belongsTo('categoria', {async: true}),     // apunta a la tabla categoria
  tipo: DS.belongsTo('tipo-producto', {async: true}),      // apunta a la tabla tipo
  marca: DS.belongsTo('marca-producto', {async: true}),    // apunta a la tabla marca
  talles: DS.hasMany('talle-producto'),

  imagen: DS.attr('string'),
  precioCosto: DS.attr('number'),
  porcentaje: DS.attr('number', {defaultValue: 0}),

  precioVenta: Ember.computed('precioCosto', 'porcentaje', function() {
    return Math.round(parseFloat(this.get('precioCosto')) + (this.get('precioCosto') * this.get('porcentaje') / 100), 2); 
  })

});
