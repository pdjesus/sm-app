import Ember from 'ember';

export default Ember.Route.extend({

  activate() {
  },

  deactivate(){
    this.send('clear');
  },

  renderTemplate(controller, model) {
    this.render('ventas.edit', {into: 'secure', controller: controller });
  },  

  actions: {

    clear() {
      this.controller.send('clear');
      var model = this.controller.get('model');
      if( model.get('isNew') ){
        Ember.Logger.debug('model#destroyRecord()');
        model.destroyRecord();
      } else if( model.get('hasDirtyAttributes') ){
        Ember.Logger.debug('model#rollbackAttributes()');
        model.rollbackAttributes();
      }
    }

  }

});
