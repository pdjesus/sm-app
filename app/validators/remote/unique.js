import Ember from 'ember';
import Base from 'ember-validations/validators/base';

export default Base.extend({

  store: Ember.inject.service(),

  call: function() {

    if (!Ember.isBlank(this.model.get(this.property))) {
      var params = {};
      var _this = this;
      params[this.options.key] = this.model.get(this.property); 
      this.get('store').queryRecord(this.options.modelType, params).then(function(result){
        if( !Ember.isEmpty(result) ) {
          result = result[0];
          if( result.get('id') !== _this.model.get('id') ) { 
            _this.errors.pushObject(_this.options.message);
          }
        }
      });
    }

  }

});