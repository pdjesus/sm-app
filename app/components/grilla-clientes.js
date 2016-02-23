import Ember from 'ember';

export default Ember.Component.extend({

  notifySelectCliente: 'selectCliente',

  model: [],

  store: Ember.inject.service(),

  didInsertElement() {
    this.get('store').findAll('cliente').then(clientes => this.set('model', clientes));
  },

  filteredModel: Ember.computed('model.[]', {
    get() { return this.get('model').sortBy('nombre'); },
    set(key, value) {
      return value.sortBy('nombre');
    }
  }),

  observesFilter: Ember.observer('filter', function(){
    var filter = this.get('filter');
    Ember.Logger.debug(`filterBy(${filter})`);
    var filteredModel = this.get('model');
    if( !Ember.isBlank(filter) ) {
      filteredModel = filteredModel.filter(function(item) {
        return item.get('nombre').toUpperCase().indexOf(filter.toUpperCase()) !== -1;
      }); 
    }
    this.set('filteredModel', filteredModel);
  }),

  actions: {

    selectCliente(cliente) {
      this.sendAction('notifySelectCliente', cliente);
    }

  }

});
