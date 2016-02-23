import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['form-group form-group-sm'],
  classNameBindings: ['showError:has-error'],

  labelClassNames: 'control-label',

  showError: Ember.computed('attrs.errors.[]', function() {
    return this.getAttr('enable') && !Ember.isEmpty(this.getAttr('errors'));
  }),

  errorMessage: Ember.computed('attrs.errors.[]', function() {
    return this.getAttr('errors')[0];
  })

});
