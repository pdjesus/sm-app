import Ember from 'ember';

export default Ember.Component.extend({

  addVenta: 'addVenta',

  actions: {
    addVenta(){
      Ember.Logger.debug("panel-ventas#addVenta");
      this.sendAction('addVenta');
    }

  }

});
