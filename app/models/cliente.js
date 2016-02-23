import DS from 'ember-data';

export default DS.Model.extend({

  nombre: DS.attr('string'),
  dni: DS.attr('string'),
  domicilio: DS.attr('string'),
  telefono: DS.attr('string'),
  email: DS.attr('string'),
  fechaNac: DS.attr('date'),
  ciudad: DS.belongsTo('ciudad')

});
