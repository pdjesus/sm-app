import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';
import Inflector from 'ember-inflector';

var App;

Ember.MODEL_FACTORY_INJECTIONS = true;

// ===== Singulars =====
Inflector.inflector.singular(/ciudades/, 'ciudad');
Inflector.inflector.singular(/categorias/, 'categoria');

// ===== Plurals =====
Inflector.inflector.plural(/ciudad/, 'ciudades');
Inflector.inflector.plural(/categoria/, 'categorias');

// ===== Irregulars =====
Inflector.inflector.irregular('venta', 'ventas');
Inflector.inflector.irregular('cuota', 'cuotas');

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;
