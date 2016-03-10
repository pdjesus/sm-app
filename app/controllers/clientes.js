import Ember from 'ember';

export default Ember.Controller.extend({

  filteredModel: Ember.computed('textFilter', 'model.[]', function(){

    var text = this.get('textFilter');
    var filteredModel = this.get('model');

    if( !Ember.isBlank(text) ) {
      filteredModel = filteredModel.filter(function(item) {
        return item.get('nombre').toUpperCase().indexOf(text.toUpperCase()) !== -1;
      }); 
    }

    return filteredModel;
  }),

  filterBy: function(text) {
    Ember.Logger.debug(`controller.clientes.filterBy(${text})`);
    this.set('textFilter', text);
  } 

});
