import BaseRoute from '../crud';

export default BaseRoute.extend({

  model: function() {
    return this.store.createRecord('cliente');
  },

  controllerName: 'clientes.edit',

  renderTemplate: function(controller, model) {  
    this.render('clientes.edit', {controller: controller});    
  }

});
