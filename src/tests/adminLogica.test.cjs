const {
  agregarUsuario,
  eliminarUsuario,
  editarUsuario,
  calcularTotalCompra,
  filtrarPorPrecio
} = require('../utils/adminLogica.cjs');

test('1. Agrega un nuevo usuario a la lista', () => {
  const inicial = [{ nombre: 'Ana', email: 'ana@mail.com' }];
  const resultado = agregarUsuario(inicial, { nombre: 'Luis', email: 'luis@mail.com' });
  expect(resultado).toHaveLength(2);
  expect(resultado[1].nombre).toBe('Luis');
});

test('2. Elimina un usuario según su índice', () => {
  const inicial = [{ nombre: 'Ana' }, { nombre: 'Luis' }];
  const resultado = eliminarUsuario(inicial, 0);
  expect(resultado).toHaveLength(1);
  expect(resultado[0].nombre).toBe('Luis');
});

test('3. Actualiza los datos de un usuario existente', () => {
  const inicial = [{ nombre: 'Ana', email: 'ana@mail.com' }];
  const resultado = editarUsuario(inicial, 0, { nombre: 'Ana María', email: 'ana@mail.com' });
  expect(resultado[0].nombre).toBe('Ana María');
});

test('4. Calcula correctamente el total del carrito de compras', () => {
  const carrito = [{ precio: 25000 }, { precio: 55000 }];
  expect(calcularTotalCompra(carrito)).toBe(80000);
});

test('5. Filtra productos por debajo del precio máximo', () => {
  const productos = [{ precio: 15000 }, { precio: 65000 }, { precio: 120000 }];
  const filtrados = filtrarPorPrecio(productos, 70000);
  expect(filtrados).toHaveLength(2);
});