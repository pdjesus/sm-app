import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {

  formasPago: ['CONTADO', 'SEMANAL', 'QUINCENAL', 'MENSUAL', 'TARJETA'],

  INTERES_TARJETA: 8,

  INTERES_FINANCIADO_30: 6,

  gotToBack(){
    this.transitionToRoute('clientes.ficha', this.get('model.ficha'));
  },

  calcularPrecioVenta() {

    var totalVenta = this.get('model.producto.precioVenta') * this.get('model.cantidad');

    this.beginPropertyChanges();
    if( this.get('formaPago') === 'TARJETA' ){
      totalVenta += (totalVenta * this.INTERES_TARJETA / 100);
      this.set('model.interes', this.INTERES_TARJETA);
      this.set('model.descuento', 0);
      this.set('entrega', 0);
    } else if( this.get('formaPago') === 'CONTADO') {
      if( this.get('descuento') ) {
        totalVenta -= (totalVenta * this.get('descuento') / 100);
        this.set('entrega', totalVenta);
        this.set('model.interes', 0);
      }
    } else {
      totalVenta += (totalVenta * this.INTERES_FINANCIADO_30 / 100);
      this.set('model.interes', this.INTERES_FINANCIADO_30);
      this.set('model.descuento', 0);
      this.set('entrega', 0);
    }

    this.set('model.totalVenta', totalVenta);
    this.endPropertyChanges();
  },

  isContado: Ember.computed.equal('model.formaPago', 'CONTADO'),
  isFinanciado: Ember.computed.not('isContado'),

  descuento: Ember.computed('model.descuento', {
    get(){ return this.get('model.descuento'); },
    set(key, value){ 
      this.set('model.descuento', value);
      this.calcularPrecioVenta();
      return value;
    }
  }),

  cantidad: Ember.computed('model.cantidad', {
    get(){ return this.get('model.cantidad'); },
    set(key, value){ 
      this.set('model.cantidad', value);
      this.calcularPrecioVenta();
      return value;
    }
  }),

  formaPago: Ember.computed('model.formaPago', {
    get(){ return this.get('model.formaPago'); },
    set(key, value){ 
      this.set('model.formaPago', value);
      this.calcularPrecioVenta();
      return value;
    }
  }),

  totalVenta: Ember.computed('model.totalVenta', {
    get(){ return this.get('model.totalVenta'); },
    set(key, value){ 
      // Solo puede editar el campo en las compras al contado
      this.setProperties({
        'model.totalVenta': value,
        entrega: value
      });
      return value;
    }
  }),

  saldo: Ember.computed('model.totalVenta', 'entrega', function(){
    this.set('model.saldo', this.get('model.totalVenta') - this.get('entrega'));
    return this.get('model.saldo');
  }),

  registrarVenta() {
    var _this = this;
    _this.get('model').save().then(function(venta){
      if( _this.get('isContado') || _this.get('entrega') > 0 ) {
        var cuota = _this.store.createRecord('cuota', {
          venta: venta,
          ficha: _this.get('model.ficha'),
          monto: _this.get('entrega'),
          fechaCuota: new Date()
        });
        cuota.save().then(function(){
          _this.gotToBack();
        });
      } else {
        _this.gotToBack();
      }
    });

  },

  actions: {

    selectProducto(producto){
      this.set('model.producto', producto);
      this.set('model.montoCosto', producto.get('precioCosto'));
      this.calcularPrecioVenta();
    },

    setTalle(talle){
      this.set('model.talle', talle);
    },

    setFormaPago(formaPago) {
      this.set('formaPago', formaPago);
    },
    
    save() {
      var _this = this;
      _this.set('showError', true);
      if( _this.get("isValid") ) {
        _this.registrarVenta();
      }
      return false;  
    },

    cancel() {
      this.gotToBack();
    },

    clear() {
      Ember.Logger.debug('controller#clear');
      this.set('showError', false);
    }

  }

});
