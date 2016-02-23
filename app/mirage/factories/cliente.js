/*
  This is an example factory definition.

  Create more files in this directory to define additional factories.
*/
import Mirage/*, {faker} */ from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  nombre: function(i) {                  // and functions
     return 'Cliente ' + i;
  },

  dni: function(i) {                  // and functions
     return (111111111 + i);
  },

  domicilio: function(i) {                  // and functions
     return 'Mitre ' + i;
  },

  telefono: function(i) {                  // and functions
     return '03404-' + (4567001 + i);
  },

  fechaNac: function(i) {                  // and functions
     return new Date() + ( 1000 * i);
  },

  email: function(i) {                  // and functions
     return 'person' + i + '@test.com';
  },

  ciudad: function() {
    return 1;
  }

  // firstName: faker.name.firstName,       // using faker
  // lastName: faker.name.firstName,
  // zipCode: faker.address.zipCode
});
