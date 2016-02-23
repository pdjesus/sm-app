/*
  This is an example factory definition.

  Create more files in this directory to define additional factories.
*/
import Mirage/*, {faker} */ from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  nombre: function() {                  // and functions
     return 'Galvez';
  },

  id: function() {                  // and functions
     return 1;
  }

});
