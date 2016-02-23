import Ember from 'ember';

export default Ember.Component.extend({

  store: Ember.inject.service(),
  classNames: ['panel', 'panel-default'],

  addTalles: 'addTalles',
  removeTalle: 'removeTalle',

  crearDetalle: function(talle, stock) {
    var obj = this.get('talles').findBy('talle', talle);
    if( !obj ) {
      obj = this.get('store').createRecord('talle-producto', {talle: `${talle}`});
    }

    obj.set('stock', stock);
    obj.set('producto', this.getAttr('producto'));

    return obj;
  },

  actions: {

    add: function() {
      if( !Ember.isBlank(this.get('talle')) ) {
        var talles = [];
        var stock = (this.get('stock') ? parseInt(this.get('stock')) : 0);
        if( this.get('talle').indexOf('-') > -1){
          var range = this.get('talle').split('-');
          try { 
            var from = parseInt(range[0]);
            var to = parseInt(range[1]);

            for (var i = from; i <= to; i++) { 
              talles.addObject(this.crearDetalle(`${i}`, stock));  
            }
          }
          catch(e) {
            Ember.Logger.debug('Formato de talle no valido', e);
          }  

        } else {
          talles.addObject(this.crearDetalle(this.get('talle'), stock));
        }

        this.sendAction('addTalles', talles);
        this.set('talle', null);
        this.set('stock', null);
      }
    },

    delete: function(item) {
      this.sendAction('removeTalle', item);
    }
  }

});
