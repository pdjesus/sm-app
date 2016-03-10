import Ember from 'ember';

export default Ember.Controller.extend({

  filteredModel: Ember.computed('textFilter', function(){

    var text = this.get('textFilter');
    var filteredModel = this.get('model');
    if( !Ember.isBlank(text) ) {
      filteredModel = filteredModel.filter(function(item) {
        return item.get('ficha.cliente.nombre').toUpperCase().indexOf(text.toUpperCase()) !== -1 ||
        item.get('producto.texto').toUpperCase().indexOf(text.toUpperCase()) !== -1;
      }); 
    }

    return filteredModel;
  }),

  filterBy: function(text) {
    Ember.Logger.debug(`controller.ventas.filterBy(${text})`);
    this.set('textFilter', text);
  } 

});
