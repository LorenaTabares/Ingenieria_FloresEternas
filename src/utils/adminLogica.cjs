function agregarUsuario(lista, nuevoUsuario) {
  return [...lista, nuevoUsuario];
}

function eliminarUsuario(lista, indice) {
  return lista.filter((_, i) => i !== indice);
}

function editarUsuario(lista, indice, datosNuevos) {
  return lista.map((u, i) => (i === indice ? datosNuevos : u));
}

function calcularTotalCompra(carrito) {
  return carrito.reduce((total, prod) => total + prod.precio, 0);
}

function filtrarPorPrecio(productos, precioMaximo) {
  return productos.filter((p) => p.precio <= precioMaximo);
}

module.exports = {
  agregarUsuario,
  eliminarUsuario,
  editarUsuario,
  calcularTotalCompra,
  filtrarPorPrecio
};