import Ember from 'ember';

export default Ember.Service.extend({

  round(number) {
    return parseInt(number * 100) / 100
  }

});
