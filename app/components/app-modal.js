import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['modal', 'fade'],

  attributeBindings: ['tabindex', 'role'],
  tabindex:'-1',
  role:'dialog',

  okButtonLabel: 'Aceptar',
  cancelButtonLabel: 'Cancelar',

  ok: 'ok',
  cancel: null,

  actions: {

    ok() {
      $(`#${this.get('elementId')}`).modal('hide');
      this.sendAction('ok');
    },

    cancel() {
      $(`#${this.get('elementId')}`).modal('hide');
      if( this.get('cancel') ) {
        this.sendAction('cancel');
      }
    }

  }

});
