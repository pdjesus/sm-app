import BaseRoute from './edit';

export default BaseRoute.extend({

  model: function() {
    return this.store.createRecord('cliente');
  },

  controllerName: 'clientes.edit'

});
