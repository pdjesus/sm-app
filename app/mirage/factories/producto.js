/*
  This is an example factory definition.

  Create more files in this directory to define additional factories.
*/
import Mirage/*, {faker} */ from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  texto: function(i) {                  // and functions
     return 'Producto ' + i;
  },

  codigo: function(i) {                  // and functions
     return `${i}`;
  },

  categoria: function() {
    return 1;
  },

  tipo: function() {
    return 1;
  },

  marca: function() {
    return 1;
  },

  precioCosto: function(i) {                  // and functions
     return 100 * i;
  },

  porcentaje: function(i) {                  // and functions
     return 12;
  }
});
