import BaseRoute from '../crud';

export default BaseRoute.extend({

  model: function() {
    return this.store.createRecord('producto');
  },

  controllerName: 'productos.edit',

  renderTemplate: function(controller, model) {  
    this.render('productos.edit', {controller: controller});    
  }

});
