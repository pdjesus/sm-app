/*
  This is an example factory definition.

  Create more files in this directory to define additional factories.
*/
import Mirage/*, {faker} */ from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  talle: function(i) {                  // and functions
     return `Talle ${i}`;
  },

  stock: function(i) {                  // and functions
     return i;
  }


});
