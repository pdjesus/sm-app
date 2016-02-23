import Ember from 'ember';

export default Ember.Component.extend({

  notifySelectTalle: 'selectTalle',

  actions: {

    selectTalle(talle) {
      this.sendAction('notifySelectTalle', talle);
    }

  }

});
