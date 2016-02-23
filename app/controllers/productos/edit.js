import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {

  categorias: Ember.computed(function(){
    return this.store.findAll('categoria');
  }),

  tipos: Ember.computed(function(){
    return this.store.findAll('tipo-producto');
  }),

  marcas: Ember.computed(function(){
    return this.store.findAll('marca-producto');
  }),

  actions: {

    save: function() {
      var _this = this;
      _this.set('showError', true);
      if( _this.get("isValid") ) {
        _this.get('model').save().then(function(){
          _this.transitionToRoute('productos');
        });
      }
      return false;  
    },

    cancel: function() {
      this.transitionToRoute('productos');
    },

    clear: function() {
      Ember.Logger.debug('controller#clear');
      this.set('showError', false);
    },

    addTalles: function(talles) {
      this.get('model.talles').addObjects(talles);
    },

    removeTalle: function(talle) {
      this.get('model.talles').removeObject(talle);
    },

    updatePrecioCosto: function(value) {
      this.set('model.precioCosto', value);
    },

    updatePorcentaje: function(value) {
      this.set('model.porcentaje', value);
    }

  },

  validations: {
    'model.texto': {
      presence: { message: 'el campo es requerido' },
      length: { maximum: 100 }
    },
    'model.codigo': {
      presence: { message: 'el campo es requerido.' },
      unique: { modelType: 'producto', key: 'codigo', message: 'ya existe un producto con el código ingresado.'}
    },
    'model.categoria': {
      required: { message: 'el campo es requerido.' }
    },
    'model.marca': {
      required: { message: 'el campo es requerido.' }
    },
    'model.tipo': {
      required: { message: 'el campo es requerido.' }
    },                  
    'model.precioCosto': {
      presence: { message: 'el campo es requerido.' },
      numericality: { messages: { numericality: 'debería ser un valor numérico.' } }
    },
    'model.porcentaje': {
      presence: { message: 'el campo es requerido.' }, 
      numericality: { greaterThan: 0, lessThanOrEqualTo: 100, 
        messages: { 
          greaterThan: 'ingrese un valor mayor a 0.',
          lessThanOrEqualTo: 'el valor no puede ser mayor a 100',
          numericality: 'debería ser un valor numérico.' 
        } 
      }
    }
  }

});
