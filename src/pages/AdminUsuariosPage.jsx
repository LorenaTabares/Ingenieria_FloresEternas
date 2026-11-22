import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPage.css';

export function AdminUsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);

  // Estados para CREAR nuevo usuario
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoEmail, setNuevoEmail] = useState('');
  const [nuevaPassword, setNuevaPassword] = useState('');

  // Estados para EDITAR un usuario existente
  const [indiceEditando, setIndiceEditando] = useState(null);
  const [datosEditados, setDatosEditados] = useState({ nombre: '', email: '', password: '' });

  const navigate = useNavigate();

  // READ: Cargar usuarios al abrir la vista
  useEffect(() => {
    const usuariosGuardados = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];
    setUsuarios(usuariosGuardados);
  }, []);

  // Función auxiliar para actualizar estado y localStorage al mismo tiempo
  const guardarEnStorage = (listaActualizada) => {
    setUsuarios(listaActualizada);
    localStorage.setItem('usuariosRegistrados', JSON.stringify(listaActualizada));
  };

  // CREATE: Agregar usuario
  const handleCrearUsuario = (e) => {
    e.preventDefault();
    if (!nuevoNombre.trim() || !nuevoEmail.trim() || !nuevaPassword.trim()) return;

    const nuevo = {
      nombre: nuevoNombre.trim(),
      email: nuevoEmail.trim(),
      password: nuevaPassword.trim()
    };

    guardarEnStorage([...usuarios, nuevo]);
    setNuevoNombre('');
    setNuevoEmail('');
    setNuevaPassword('');
  };

  // Iniciar modo edición en una fila
  const iniciarEdicion = (index, usuario) => {
    setIndiceEditando(index);
    setDatosEditados({
      nombre: usuario.nombre,
      email: usuario.email,
      password: usuario.password || '123456'
    });
  };

  // UPDATE: Guardar los cambios editados
  const handleGuardarEdicion = (index) => {
    const listaActualizada = usuarios.map((u, i) =>
      i === index ? datosEditados : u
    );
    guardarEnStorage(listaActualizada);
    setIndiceEditando(null);
  };

  // DELETE: Eliminar usuario
  const handleEliminarUsuario = (index) => {
    const listaFiltrada = usuarios.filter((_, i) => i !== index);
    guardarEnStorage(listaFiltrada);
    if (indiceEditando === index) setIndiceEditando(null);
  };

  return (
    <div className="admin-page">
      <div className="admin-contenedor">
        <div className="admin-tarjeta">
          <div className="admin-encabezado">
            <h2 className="admin-titulo">Administración de Usuarios</h2>
            <p className="admin-subtitulo">
              Crea, edita o elimina los clientes registrados en Nicore Flowers
            </p>
          </div>

          {/* Formulario para Crear Usuario */}
          <form className="admin-form-crear" onSubmit={handleCrearUsuario}>
            <input
              type="text"
              className="admin-input"
              placeholder="Nombre completo"
              value={nuevoNombre}
              onChange={(e) => setNuevoNombre(e.target.value)}
              required
            />
            <input
              type="email"
              className="admin-input"
              placeholder="Correo electrónico"
              value={nuevoEmail}
              onChange={(e) => setNuevoEmail(e.target.value)}
              required
            />
            <input
              type="text"
              className="admin-input"
              placeholder="Contraseña"
              value={nuevaPassword}
              onChange={(e) => setNuevaPassword(e.target.value)}
              required
            />
            <button type="submit" className="btn-crear">+ Agregar Usuario</button>
          </form>

          {/* Tabla de Usuarios */}
          {usuarios.length === 0 ? (
            <div className="admin-vacio">
              No hay usuarios registrados. Agrega uno arriba o regístrate desde el Login 🌸
            </div>
          ) : (
            <div className="tabla-responsive">
              <table className="admin-tabla">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre Completo</th>
                    <th>Correo Electrónico</th>
                    <th>Contraseña</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((usuario, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>

                      {indiceEditando === index ? (
                        <>
                          <td>
                            <input
                              type="text"
                              className="admin-input-tabla"
                              value={datosEditados.nombre}
                              onChange={(e) =>
                                setDatosEditados({ ...datosEditados, nombre: e.target.value })
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
                              value={datosEditados.password}
                              onChange={(e) =>
                                setDatosEditados({ ...datosEditados, password: e.target.value })
                              }
                            />
                          </td>
                          <td>
                            <div className="acciones-fila">
                              <button
                                className="btn-accion btn-guardar"
                                onClick={() => handleGuardarEdicion(index)}
                              >
                                Guardar
                              </button>
                              <button
                                className="btn-accion btn-cancelar"
                                onClick={() => setIndiceEditando(null)}
                              >
                                Cancelar
                              </button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td><strong>{usuario.nombre}</strong></td>
                          <td>{usuario.email}</td>
                          <td>{usuario.password || '••••••'}</td>
                          <td>
                            <div className="acciones-fila">
                              <button
                                className="btn-accion btn-editar"
                                onClick={() => iniciarEdicion(index, usuario)}
                              >
                                Editar
                              </button>
                              <button
                                className="btn-accion btn-eliminar-fila"
                                onClick={() => handleEliminarUsuario(index)}
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

          {/* Botón inferior para ir a Compras */}
          <div className="admin-acciones-pie">
            <button
              className="btn-admin-navegar"
              onClick={() => navigate('/admin/compras')}
            >
              Ver Compras →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}