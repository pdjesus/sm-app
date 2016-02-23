import Ember from 'ember';

export default Ember.Route.extend({

  activate() {
    Ember.run.schedule('afterRender', () => {
      Ember.$("#formModal").modal();
    });
  },

  deactivate(){
    Ember.$("#formModal").modal('hide');
    this.send('clear');
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
