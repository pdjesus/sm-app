export default function(server) {

  // Seed your development database using your factories. This
  // data will not be loaded in your tests.

  server.createList('cliente', 10);
  server.createList('ciudad', 1);
  server.createList('producto', 15);
  server.createList('categoria', 3);
  server.createList('tipo-producto', 3);
  server.createList('marca-producto', 3);
  server.createList('talle-producto', 1);
}
