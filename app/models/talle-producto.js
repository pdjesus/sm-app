import DS from 'ember-data';

export default DS.Model.extend({
  
  talle: DS.attr('string'),
  stock: DS.attr('number')
  
});
