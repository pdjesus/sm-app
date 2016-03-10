import BaseRoute from '../crud';

export default BaseRoute.extend({
  
  renderTemplate: function(controller, model) {  
    this.render('productos.edit', {into: 'secure', controller: controller});    
  }
    
});
