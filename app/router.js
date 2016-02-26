import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('secure', function() {
    this.route('ventas', { resetNamespace: true }, function() {
      this.route('new', {
        path: '/:ficha_id/new'
      });
      this.route('form', {
        path: '/:venta_id/form'
      });
    });
    this.route('pedidos', { resetNamespace: true }, function() {
      this.route('new');
      this.route('edit', {
        path: '/edit/:pedido_id'
      });
    });
    this.route('reclamos', { resetNamespace: true });
    this.route('entregas', { resetNamespace: true });
    this.route('reportes');
    this.route('clientes', { resetNamespace: true }, function() {
      this.route('new');
      this.route('edit', {
        path: '/edit/:cliente_id'
      });
      this.route('ficha', {
        path: '/:cliente_id/ficha'
      });
    });

    this.route('productos', { resetNamespace: true }, function(){
      this.route('new');
      this.route('edit', {
        path: '/edit/:producto_id'
      });      
    });
  });
});

export default Router;
