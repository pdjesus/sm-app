import Ember from 'ember';

export default Ember.Route.extend({

  renderTemplate: function(controller, model) {
    this.render('pedidos.edit', {into: 'secure', controller: controller })    
  }

});
