import Ember from 'ember';

export default Ember.Controller.extend({

  filteredModel: Ember.computed('model.[]', {
    get() { return this.get('model').sortBy('nombre'); },
    set(key, value) {
      return value.sortBy('nombre');
    }
  }),

  filterBy: function(text) {
    Ember.Logger.debug(`filterBy(${text})`);
    var filteredModel = this.get('model');
    if( !Ember.isBlank(text) ) {
      filteredModel = filteredModel.filter(function(item) {
        return item.get('nombre').toUpperCase().indexOf(text.toUpperCase()) !== -1;
      }); 
    }
    this.set('filteredModel', filteredModel);
  }  

});
