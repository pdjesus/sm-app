import Ember from 'ember';

export default Ember.Controller.extend({

  estadoSelected: Ember.computed({
    get() { return 'PENDIENTE'; },
    set(key, value) {
      Ember.$.getJSON('pedidos', {estado: value}).then( result => this.set('model', result));
      return value;
    }
  }),

  estados: [ 'PENDIENTE', 'COMPRADO'],

  filteredModel: Ember.computed('model.[]', {
    get() { return this.get('model'); },
    set(key, value) {
      return value;
    }
  }),

  filterBy: function(text) {
    Ember.Logger.debug(`filterBy(${text})`);
    var filteredModel = this.get('model');
    if( !Ember.isBlank(text) ) {
      filteredModel = filteredModel.filter(function(item) {
        return item.get('cliente').toUpperCase().indexOf(text.toUpperCase()) !== -1 ||
          item.get('producto').toUpperCase().indexOf(text.toUpperCase()) !== -1;
      }); 
    }
    this.set('filteredModel', filteredModel);
  }  

});
