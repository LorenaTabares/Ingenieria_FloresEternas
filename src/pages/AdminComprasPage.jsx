import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPage.css';

export function AdminComprasPage() {
  const [compras, setCompras] = useState([]);

  // Estados para CREAR compra manual
  const [cliente, setCliente] = useState('');
  const [email, setEmail] = useState('');
  const [productos, setProductos] = useState('');
  const [metodoPago, setMetodoPago] = useState('NEQUI');
  const [total, setTotal] = useState('');

  // Estados para EDITAR compra existente
  const [idEditando, setIdEditando] = useState(null);
  const [datosEditados, setDatosEditados] = useState({});

  const navigate = useNavigate();

  // READ: Cargar compras desde localStorage
  useEffect(() => {
    const comprasGuardadas = JSON.parse(localStorage.getItem('comprasRealizadas')) || [];
    setCompras(comprasGuardadas);
  }, []);

  const guardarEnStorage = (listaActualizada) => {
    setCompras(listaActualizada);
    localStorage.setItem('comprasRealizadas', JSON.stringify(listaActualizada));
  };

  // CREATE: Registrar compra nueva
  const handleCrearCompra = (e) => {
    e.preventDefault();
    if (!cliente.trim() || !productos.trim() || !total) return;

    const nuevaCompra = {
      id: Date.now(),
      fecha: new Date().toLocaleDateString('es-CO'),
      cliente: cliente.trim(),
      email: email.trim() || 'admin@nicore.com',
      productos: productos.trim(),
      metodoPago,
      total: Number(total)
    };

    guardarEnStorage([...compras, nuevaCompra]);
    setCliente('');
    setEmail('');
    setProductos('');
    setTotal('');
  };

  // Iniciar edición de fila
  const iniciarEdicion = (compra) => {
    setIdEditando(compra.id);
    setDatosEditados({ ...compra });
  };

  // UPDATE: Guardar cambios de la compra
  const handleGuardarEdicion = (id) => {
    const listaActualizada = compras.map((c) =>
      c.id === id ? { ...datosEditados, total: Number(datosEditados.total) } : c
    );
    guardarEnStorage(listaActualizada);
    setIdEditando(null);
  };

  // DELETE: Eliminar compra
  const handleEliminarCompra = (id) => {
    const listaFiltrada = compras.filter((c) => c.id !== id);
    guardarEnStorage(listaFiltrada);
    if (idEditando === id) setIdEditando(null);
  };

  return (
    <div className="admin-page">
      <div className="admin-contenedor">
        <div className="admin-tarjeta">
          <div className="admin-encabezado">
            <h2 className="admin-titulo">Administración de Compras</h2>
            <p className="admin-subtitulo">
              Gestiona, edita o elimina los pedidos realizados en la tienda
            </p>
          </div>

          {/* Formulario para Crear Compra */}
          <form className="admin-form-crear" onSubmit={handleCrearCompra}>
            <input
              type="text"
              className="admin-input"
              placeholder="Nombre del cliente"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              required
            />
            <input
              type="email"
              className="admin-input"
              placeholder="Correo del cliente"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              className="admin-input"
              placeholder="Productos (ej: Ramo Rosas)"
              value={productos}
              onChange={(e) => setProductos(e.target.value)}
              required
            />
            <select
              className="admin-input"
              value={metodoPago}
              onChange={(e) => setMetodoPago(e.target.value)}
            >
              <option value="NEQUI">NEQUI</option>
              <option value="TARJETA">TARJETA</option>
              <option value="PSE">PSE</option>
            </select>
            <input
              type="number"
              className="admin-input"
              placeholder="Total ($)"
              value={total}
              onChange={(e) => setTotal(e.target.value)}
              required
            />
            <button type="submit" className="btn-crear">+ Agregar Compra</button>
          </form>

          {/* Tabla de Compras */}
          {compras.length === 0 ? (
            <div className="admin-vacio">
              No hay compras registradas todavía. Realiza una desde el carrito o agrégala arriba 🌸
            </div>
          ) : (
            <div className="tabla-responsive">
              <table className="admin-tabla">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Cliente</th>
                    <th>Correo</th>
                    <th>Productos</th>
                    <th>Pago</th>
                    <th>Total</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {compras.map((compra) => (
                    <tr key={compra.id}>
                      <td>{compra.fecha}</td>

                      {idEditando === compra.id ? (
                        <>
                          <td>
                            <input
                              type="text"
                              className="admin-input-tabla"
                              value={datosEditados.cliente}
                              onChange={(e) =>
                                setDatosEditados({ ...datosEditados, cliente: e.target.value })
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="email"
                              className="admin-input-tabla"
                              value={datosEditados.email}
                              onChange={(e) =>
                                setDatosEditados({ ...datosEditados, email: e.target.value })
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="admin-input-tabla"
                              value={datosEditados.productos}
                              onChange={(e) =>
                                setDatosEditados({ ...datosEditados, productos: e.target.value })
                              }
                            />
                          </td>
                          <td>
                            <select
                              className="admin-input-tabla"
                              value={datosEditados.metodoPago}
                              onChange={(e) =>
                                setDatosEditados({ ...datosEditados, metodoPago: e.target.value })
                              }
                            >
                              <option value="NEQUI">NEQUI</option>
                              <option value="TARJETA">TARJETA</option>
                              <option value="PSE">PSE</option>
                            </select>
                          </td>
                          <td>
                            <input
                              type="number"
                              className="admin-input-tabla"
                              value={datosEditados.total}
                              onChange={(e) =>
                                setDatosEditados({ ...datosEditados, total: e.target.value })
                              }
                            />
                          </td>
                          <td>
                            <div className="acciones-fila">
                              <button
                                className="btn-accion btn-guardar"
                                onClick={() => handleGuardarEdicion(compra.id)}
                              >
                                Guardar
                              </button>
                              <button
                                className="btn-accion btn-cancelar"
                                onClick={() => setIdEditando(null)}
                              >
                                Cancelar
                              </button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td><strong>{compra.cliente}</strong></td>
                          <td>{compra.email}</td>
                          <td>{compra.productos}</td>
                          <td>{compra.metodoPago}</td>
                          <td><strong>${Number(compra.total).toLocaleString()}</strong></td>
                          <td>
                            <div className="acciones-fila">
                              <button
                                className="btn-accion btn-editar"
                                onClick={() => iniciarEdicion(compra)}
                              >
                                Editar
                              </button>
                              <button
                                className="btn-accion btn-eliminar-fila"
                                onClick={() => handleEliminarCompra(compra.id)}
                              >
                                Eliminar
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Botón inferior para regresar a Usuarios */}
          <div className="admin-acciones-pie">
            <button
              className="btn-admin-navegar"
              onClick={() => navigate('/admin/usuarios')}
            >
              ← Ver Usuarios Registrados
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}