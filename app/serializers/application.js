import DS from 'ember-data';
import Ember from 'ember';
import Inflector from 'ember-inflector';

export default DS.JSONAPISerializer.extend(DS.EmbeddedRecordsMixin, {

  serialize(snapshot, options) {
    var json = this._super(snapshot, options);
    if( !Ember.isBlank(json.data.attributes) ) {
      json.data.attributes.type = json.data.type;
      json.data.attributes['id'] = ( json.data.id ? json.data.id : null );
    }
    return json;
  },

  keyForAttribute(attr, method) { return attr; },

  keyForRelationship(key, relationship, method){ return key; }

});