import Ember from 'ember';
import DS from 'ember-data';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {

  ciudades: Ember.computed(function() {
    return this.store.findAll('ciudad');
  }),

  actions: {

    setCiudad(ciudad) {
      this.set('model.ciudad', ciudad);
    },

    save: function(model) {
      var _this = this;
      _this.set('showError', true);
      _this.validate().then(function(){
        if( _this.get("isValid") ) {
          model.save().then(function(){
            _this.transitionToRoute('clientes');
          });
        }
      });
      return false;  
    },

    cancel: function() {
      this.transitionToRoute('clientes');
    },

    clear: function() {
      Ember.Logger.debug('controller#clear');
      this.set('showError', false);
    }

  },

  validations: {
    'model.nombre': {
      presence: { message: 'el campo es requerido' },
      length: { maximum: 100 }
    },
    'model.dni': {
      presence: { message: 'el campo es requerido.' },
      numericality: { messages: { numericality: 'no posee un valor numérico válido' } },
      length: { maximum: 8 }
    },
    'model.domicilio': {
      presence: { message: 'el campo es requerido.' },
      length: { maximum: 100 }
    },
    'model.telefono': {
      length: { maximum: 20 }
    },
    'model.email': {
      length: { maximum: 100 }
    },
    'model.ciudad': {
      presence: { message: 'el campo es requerido' }
    }                    
  }

});
