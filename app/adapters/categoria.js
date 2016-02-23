import JSONAPIAdapter from './application';

export default JSONAPIAdapter.extend({

  pathForType: function(modelName) {
    return 'categorias';
  }

});
