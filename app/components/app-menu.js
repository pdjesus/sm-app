import Ember from 'ember';

export default Ember.Component.extend({

  filterBy: 'filterBy',

  observesFilter: Ember.observer('filter', function(){
    this.sendAction('filterBy', this.get('filter'));
  })

});
