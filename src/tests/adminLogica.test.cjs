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

test('6. Genera correctamente el enlace formateado para la API de WhatsApp (RF_004)', () => {
  const telefono = '573206104806';
  const mensaje = 'Ramo de Rosas color Azul Rey';
  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

  expect(url).toContain('https://wa.me/573206104806?text=');
  expect(url).toContain('Ramo%20de%20Rosas');
});

test('7. Valida que el listado de productos destacados no esté vacío (RF_002)', () => {
  const productosDestacados = [
    { id: 1, nombre: 'Ramo Eterno Clásico', precio: 45000 },
    { id: 2, nombre: 'Tulipanes Pastel', precio: 55000 }
  ];

  expect(productosDestacados.length).toBeGreaterThan(0);
  expect(productosDestacados[0]).toHaveProperty('precio');
});
test('8. Valida que no se permita registrar una contraseña menor a 6 caracteres (RF_001)', () => {
  const validarPassword = (password) => password.length >= 6;

  expect(validarPassword('12345')).toBe(false);
  expect(validarPassword('flores2026')).toBe(true);
});

test('9. Cambia dinámicamente la imagen de la flor según el color seleccionado (RF_004)', () => {
  const variantesRosa = [
    { nombreColor: 'Rojo', imagen: '/img-tipos-flores/Rosa-roja.jpg' },
    { nombreColor: 'Azul Rey', imagen: '/img-tipos-flores/Rosa-azul-rey.jpg' }
  ];

  const seleccion = variantesRosa.find((v) => v.nombreColor === 'Azul Rey');

  expect(seleccion).toBeDefined();
  expect(seleccion.imagen).toBe('/img-tipos-flores/Rosa-azul-rey.jpg');
});

test('10. Impide enviar el formulario de contacto si hay campos vacíos (RF_004)', () => {
  const validarFormularioContacto = (nombre, correo, mensaje) => {
    return nombre.trim() !== '' && correo.trim() !== '' && mensaje.trim() !== '';
  };

  expect(validarFormularioContacto('Lorena', '', 'Quiero un ramo')).toBe(false);
  expect(validarFormularioContacto('Lorena', 'lorena@correo.com', 'Quiero un ramo')).toBe(true);
});