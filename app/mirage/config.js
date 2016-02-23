import Mirage from 'ember-cli-mirage';

export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */
  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Route shorthand cheatsheet
  */

  this.get('/ventas/pendientes', function(){
    return [
      {fechaVenta: '05/11/2015', cliente: 'Cliente 1', dni: '17201763', producto: 'Producto 1', talle: 'XL', interes: '10', totalVenta: '10000', saldo: '2000', formaPago: '3 Cuotas'},
      {fechaVenta: '05/10/2015', cliente: 'Cliente 2', dni: '23301663', producto: 'Producto 1', talle: 'XL', interes: '10', totalVenta: '10000', saldo: '2000', formaPago: '6 Cuotas'},
      {fechaVenta: '15/08/2015', cliente: 'Cliente 3', dni: '30401813', producto: 'Producto 1', talle: 'XL', interes: '10', totalVenta: '10000', saldo: '2000', formaPago: '3 Cuotas'},
      {fechaVenta: '05/10/2015', cliente: 'Cliente 4', dni: '16501823', producto: 'Producto 1', talle: 'XL', interes: '10', totalVenta: '10000', saldo: '2000', formaPago: '12 Cuotas'}
    ];
  });

  this.get('/pedidos/pendientes', function(){
    return [
      {fechaPedido: '05/11/2015', cliente: 'Cliente 1', dni: '17201763', producto: 'Producto 1', talle: 'XL', cantidad: '10', entrega: '1200', estado: 'Pendiente'},
      {fechaPedido: '05/10/2015', cliente: 'Cliente 2', dni: '23301663', producto: 'Producto 1', talle: 'XL', cantidad: '10', entrega: '1200', estado: 'Pendiente'},
      {fechaPedido: '15/08/2015', cliente: 'Cliente 3', dni: '30401813', producto: 'Producto 1', talle: 'XL', cantidad: '10', entrega: '1200', estado: 'Pendiente'},
      {fechaPedido: '05/10/2015', cliente: 'Cliente 4', dni: '16501823', producto: 'Producto 1', talle: 'XL', cantidad: '10', entrega: '1200', estado: 'Pendiente'}
    ];
  });

  this.get('/reclamos/pendientes', function(){
    return [
      {fechaReclamo: '05/10/2015', cliente: 'Cliente 2', dni: '23301663', fechaVenta: '05/10/2015', talle: 'XL', cantidad: '10', descripcion: 'Producto 1', codigo: '22202938'},
      {fechaReclamo: '05/11/2015', cliente: 'Cliente 1', dni: '17201763', fechaVenta: '05/11/2015', talle: 'XL', cantidad: '10', descripcion: 'Producto 2', codigo: '22332938'},
      {fechaReclamo: '15/08/2015', cliente: 'Cliente 3', dni: '30401813', fechaVenta: '15/08/2015', talle: 'XL', cantidad: '10', descripcion: 'Producto 3', codigo: '61202938'},
      {fechaReclamo: '05/10/2015', cliente: 'Cliente 4', dni: '16501823', fechaVenta: '05/10/2015', talle: 'XL', cantidad: '10', descripcion: 'Producto 4', codigo: '82292999'}
    ];
  });

  this.get('/entregas/pendientes', function(){
    return [
      {fechaEntrega: '05/11/2015', cliente: 'Cliente 122', dni: '17201763', fechaVenta: '05/11/2015', talle: 'XL', cantidad: '10', descripcion: 'Producto 2', codigo: '22332938'},
      {fechaEntrega: '05/10/2015', cliente: 'Cliente 232', dni: '23301663', fechaVenta: '05/10/2015', talle: 'XL', cantidad: '10', descripcion: 'Producto 1', codigo: '22202938'},
      {fechaEntrega: '15/08/2015', cliente: 'Cliente 334', dni: '30401813', fechaVenta: '15/08/2015', talle: 'XL', cantidad: '10', descripcion: 'Producto 3', codigo: '61202938'},
      {fechaEntrega: '05/10/2015', cliente: 'Cliente 411', dni: '16501823', fechaVenta: '05/10/2015', talle: 'XL', cantidad: '10', descripcion: 'Producto 4', codigo: '82292999'}
    ];
  });

  var normalizeCliente = function(attrs) {
      return {
        type: 'clientes', 
        id: attrs.id, 
        attributes: attrs,
        relationships: {
          ciudad: {
            data: { type: 'ciudades' , id: attrs.ciudad }
          }
        }
      };
  };

  this.get('/clientes/:id', function(db, request) {
    var id = request.params.id;

    return {
      data: {
        type: 'clientes',
        id: id,
        attributes: db.clientes.find(id)
      }
    };
  });

  this.get('/clientes', function(db) {
    return {
      data: db.clientes.map(attrs => (normalizeCliente(attrs)))
    };
  });

  this.post('/clientes', function(db, request) {
    var data = JSON.parse(request.requestBody).data;
    var attrs = data.attributes;
    attrs['ciudad'] = data.relationships.ciudad.data.id;
    var cliente = db.clientes.insert(attrs);
    return {data: normalizeCliente(cliente)};
  });

  this.delete('/clientes/:id', function(db, request) {
    db.clientes.remove(request.params.id);
    return new Mirage.Response(204, {});
  });

  this.patch('/clientes/:id', function(db, request) {
    var id = request.params.id;
    var cliente = db.clientes.find(id);
    var data = JSON.parse(request.requestBody).data;
    var attrs = data.attributes;
    attrs['ciudad'] = data.relationships.ciudad.data.id;
    db.clientes.update(cliente, attrs);
    return {data: normalizeCliente(db.clientes.find(id))};
  });

  this.get('/ciudades/:id', function(db, request) {
    var id = request.params.id;

    return {
      data: {
        type: 'ciudades',
        id: id,
        attributes: db.ciudads.find(id)
      }
    };
  });

  this.get('/ciudades', function(db) {
    return {
      data: db.ciudads.map(attrs => (
        {type: 'ciudades', id: attrs.id, attributes: attrs }
        ))
    };
  });

  var normalizeProducto = function(attrs) {
      return {
        type: 'productos', 
        id: attrs.id, 
        attributes: attrs,
        relationships: {
          categoria: {
            data: { type: 'categorias' , id: attrs.categoria }
          },
          marca: {
            data: { type: 'marca-productos' , id: attrs.marca }
          },
          tipo: {
            data: { type: 'tipo-productos' , id: attrs.tipo }
          },
          talles: {
            data: [ {id: 1, type: 'talle-productos'} ]
          }
        }
      };
  };

  this.get('/productos/:id', function(db, request) {
    var id = request.params.id;
    return {
      data: normalizeProducto(db.productos.find(id))
    };
  });

  this.get('/productos', function(db, request) {
    return {
      data: db.productos.where(request.queryParams).map(attrs => (
        normalizeProducto(attrs)
      ))
    };
  });

  this.post('/productos', function(db, request) {
    var data = JSON.parse(request.requestBody).data;
    var attrs = data.attributes;
    attrs['categoria'] = data.relationships.categoria.data.id;
    attrs['marca'] = data.relationships.marca.data.id;
    attrs['tipo'] = data.relationships.tipo.data.id;
    var producto = db.productos.insert(attrs);
    return {data: normalizeProducto(producto)};
  });

  this.delete('/productos/:id', function(db, request) {
    db.productos.remove(request.params.id);
    return new Mirage.Response(204, {});
  });

  this.patch('/productos/:id', function(db, request) {
    var id = request.params.id;
    var producto = db.productos.find(id);
    var data = JSON.parse(request.requestBody).data;
    var attrs = data.attributes;
    attrs['categoria'] = data.relationships.categoria.data.id;
    attrs['marca'] = data.relationships.marca.data.id;
    attrs['tipo'] = data.relationships.tipo.data.id;
    db.productos.update(producto, attrs);
    return {data: normalizeProducto(db.productos.find(id))};
  });

  this.get('/categorias', function(db) {
    return {
      data: db.categoria.map(attrs => (
        {type: 'categorias', id: attrs.id, attributes: attrs }
        ))
    };
  });

  this.get('/categorias/:id', function(db, request) {
    var id = request.params.id;

    return {
      data: {
        type: 'categorias',
        id: id,
        attributes: db.categoria.find(id)
      }
    };
  });

  this.get('/marca-productos', function(db) {
    return {
      data: db['marca-productos'].map(attrs => (
        {type: 'marca-productos', id: attrs.id, attributes: attrs }
        ))
    };
  });

  this.get('/marca-productos/:id', function(db, request) {
    var id = request.params.id;

    return {
      data: {
        type: 'marca-productos',
        id: id,
        attributes: db['marca-productos'].find(id)
      }
    };
  });

  this.get('/tipo-productos', function(db) {
    return {
      data: db['tipo-productos'].map(attrs => (
        {type: 'tipo-productos', id: attrs.id, attributes: attrs }
        ))
    };
  });

  this.get('/tipo-productos/:id', function(db, request) {
    var id = request.params.id;

    return {
      data: {
        type: 'tipo-productos',
        id: id,
        attributes: db['tipo-productos'].find(id)
      }
    };
  });

  this.get('/talle-productos/:id', function(db, request) {
    var id = request.params.id;

    return {
      data: {
        type: 'talle-productos',
        id: id,
        attributes: db['talle-productos'].find(id)
      }
    };
  });

  /*
    GET shorthands

    // Collections
    this.get('/contacts');
    this.get('/contacts', 'users');
    this.get('/contacts', ['contacts', 'addresses']);

    // Single objects
    this.get('/contacts/:id');
    this.get('/contacts/:id', 'user');
    this.get('/contacts/:id', ['contact', 'addresses']);
  */

  /*
    POST shorthands

    this.post('/contacts');
    this.post('/contacts', 'user'); // specify the type of resource to be created
  */

  /*
    PUT shorthands

    this.put('/contacts/:id');
    this.put('/contacts/:id', 'user'); // specify the type of resource to be updated
  */

  /*
    DELETE shorthands

    this.del('/contacts/:id');
    this.del('/contacts/:id', 'user'); // specify the type of resource to be deleted

    // Single object + related resources. Make sure parent resource is first.
    this.del('/contacts/:id', ['contact', 'addresses']);
  */

  /*
    Function fallback. Manipulate data in the db via

      - db.{collection}
      - db.{collection}.find(id)
      - db.{collection}.where(query)
      - db.{collection}.update(target, attrs)
      - db.{collection}.remove(target)

    // Example: return a single object with related models
    this.get('/contacts/:id', function(db, request) {
      var contactId = +request.params.id;

      return {
        contact: db.contacts.find(contactId),
        addresses: db.addresses.where({contact_id: contactId})
      };
    });

  */
}

/*
You can optionally export a config that is only loaded during tests
export function testConfig() {

}
*/
