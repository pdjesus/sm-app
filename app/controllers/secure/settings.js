import Ember from 'ember';

export default Ember.Controller.extend({

  categorias: Ember.computed(function(){
    return this.store.findAll('categoria');
  }),

  marcas: Ember.computed(function(){
    return this.store.findAll('marca-producto');
  }),  

  tipos: Ember.computed(function(){
    return this.store.findAll('tipo-producto');
  }),

  ciudades: Ember.computed(function(){
    return this.store.findAll('ciudad');
  }),

  actions: {

    selectCategoria(item){
      this.set('categoria', item);
    },

    selectMarca(item){
      this.set('marca', item);
    },

    selectTipo(item){
      this.set('tipo', item);
    },

    selectCiudad(item){
      this.set('ciudad', item);
    },

    saveCategoria(texto){
      var item = this.get('categoria');
      if( !item ) {
        item = this.store.createRecord('categoria');
      }
      item.set('texto', texto);
      item.save();
      this.send('selectCategoria', null);
    },

    saveMarca(texto){
      var item = this.get('marca');
      if( !item ) {
        item = this.store.createRecord('marca-producto');
      }
      item.set('texto', texto);
      item.save();
      this.send('selectMarca', null);
    },

    saveTipo(texto){
      var item = this.get('tipo');
      if( !item ) {
        item = this.store.createRecord('tipo-producto');
      }
      item.set('texto', texto);
      item.save();
      this.send('selectTipo', null);
    },

    saveCiudad(texto){
      var item = this.get('ciudad');
      if( !item ) {
        item = this.store.createRecord('ciudad');
      }
      item.set('nombre', texto);
      item.save();
      this.send('selectCiudad', null);
    },

    removeCategoria(item){
      item.destroyRecord();
      this.send('selectCategoria', null);
    },

    removeMarca(item){
      item.destroyRecord();
      this.send('selectMarca', null);
    },

    removeTipo(item){
      item.destroyRecord();
      this.send('selectTipo', null);
    },

    removeCiudad(item){
      item.destroyRecord();
      this.send('selectCiudad', null);
    },


  }

});
