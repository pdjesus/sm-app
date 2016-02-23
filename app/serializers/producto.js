import JSONAPISerializer from './application';

export default JSONAPISerializer.extend({

  attrs: {
    talles: { serialize: 'records' }
  }

});