import Ember from 'ember';

export default Ember.Component.extend({

  store: Ember.inject.service(),

  notifySelectProducto: 'selectProducto',

  model: [],
  
  didInsertElement() {
    this.get('store').findAll('producto').then(producto => this.set('model', producto));
  },

  categorias: Ember.computed(function(){
    return this.get('store').findAll('categoria');
  }),

  tipos: Ember.computed(function(){
    return this.get('store').findAll('tipo-producto');
  }),

  marcas: Ember.computed(function(){
    return this.get('store').findAll('marca-producto');
  }),

  filteredProductos: Ember.computed('model', 'marca', 'categoria', 'tipo', function() {
    var result = this.get('model');

    if( this.marca ) {
      result = result.filterBy('marca.id', this.marca.id);
    }

    if( this.categoria ) {
      result = result.filterBy('categoria.id', this.categoria.id);
    }

    if( this.tipo ) {
      result = result.filterBy('tipo.id', this.tipo.id);
    }

    return result;

  }),

  changeFilterObserves: Ember.observer('marca', 'categoria', 'tipo', function(){
    this.send('selectProducto', null);
  }), 

  actions: {

    selectProducto(producto) {
      this.sendAction('notifySelectProducto', producto);
    },

    resetFilter(){
      this.set('marca', null);
      this.set('categoria', null);
      this.set('tipo', null);
    }

  }

});
