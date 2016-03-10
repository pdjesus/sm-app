import BaseRoute from './edit';

export default BaseRoute.extend({

  model: function() {
    return this.store.createRecord('producto');
  },

  controllerName: 'productos.edit'

});
