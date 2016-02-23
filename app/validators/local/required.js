import Ember from 'ember';
import Base from 'ember-validations/validators/base';

export default Base.extend({

  call: function() {
    if( !Ember.isPresent(this.model.get(this.property)) || !Ember.isPresent(this.model.get(`${this.property}.content`)) ) {
      this.errors.pushObject(this.options.message);
    }
  }

});