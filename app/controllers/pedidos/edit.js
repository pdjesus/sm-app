import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {

  precioVenta: Ember.computed('model.producto', 'model.cantidad', function() {
    return Math.round(this.get('model.producto.precioVenta') * this.get('model.cantidad'), 2); 
  }),

  saldo: Ember.computed('model.entrega', 'precioVenta', function() {
    return this.get('precioVenta') - this.get('model.entrega'); 
  }),

  disableTalleField: Ember.computed('nuevoTalle', function(){
    if( !this.get('nuevoTalle') ) {
      this.set('talle', null);
    }
    return !this.get('nuevoTalle');
  }),

  talle: Ember.computed('model.talle', {
    get() {
      if( this.get('model.talle') ) {
        return this.get('model.talle')
      } 
    },
    set(key, value) {
      if( !this.get('model.talle') || (this.get('model.talle') && !this.get('model.talle.isNew')) ) {
        this.set('model.talle', this.store.createRecord('talle-producto'))
      }

      this.set('model.talle.talle', value);

      return value;
    }
  }),

  actions: {
    selectProducto: function(producto) {
      this.set('model.producto', producto);
      this.set('model.talle', null);
    },
 
    selectTalle: function(talle) {
      this.set('model.talle', talle);
    },

    selectCliente: function(cliente) {
      this.store.queryRecord('ficha', {cliente: cliente.id}).then(ficha => this.set('model.ficha', ficha));
    },

    save: function(model) {
      var _this = this;
      _this.set('showError', true);
      _this.validate().then(function(){
        if( _this.get("isValid") ) {
          model.save().then(function(){
            _this.transitionToRoute('pedidos');
          });
        }
      });
      return false;  
    },

    cancel: function() {
      this.transitionToRoute('pedidos');
    }

  },

  validations: {
    'model.producto': {
      required: { message: 'Seleccione un producto.' }
    },
    'model.talle': {  
      required: { message: 'Seleccione un talle para el producto.' }
    },
    'model.fechaPedido': {
      presence: { message: 'el campo es requerido' }
    },
    'model.cantidad': {
      presence: { message: 'el campo es requerido' },
      numericality: { onlyInteger: true, greaterThan: 0, lessThanOrEqualTo: 10, 
        messages: { 
          greaterThan: 'ingrese un valor mayor a 0.',
          lessThanOrEqualTo: 'el valor no puede ser mayor a 10',
          numericality: 'debería ser un valor numérico.' 
        } 
      }
    }
  }

});
