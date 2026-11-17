import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IMAGENES } from '../assets/imagenes';
import './LoginPage.css';

export function LoginPage() {
  // 'login' | 'registro' | 'recuperar'
  const [modo, setModo] = useState('login');

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [mostrarPass, setMostrarPass] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });

  // Estado para saber si ya hay un usuario logueado
  const [usuarioActivo, setUsuarioActivo] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const nombreGuardado = localStorage.getItem('usuarioNombre');
    const emailGuardado = localStorage.getItem('usuarioEmail');
    if (nombreGuardado && emailGuardado) {
      setUsuarioActivo({ nombre: nombreGuardado, email: emailGuardado });
    }
  }, []);

  const cambiarModo = (nuevoModo) => {
    setModo(nuevoModo);
    setMensaje({ texto: '', tipo: '' });
    setPassword('');
    setConfirmarPassword('');
  };

  // 1. Manejar Inicio de Sesión
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setCargando(true);

    const usuariosRegistrados = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];
    const usuarioEncontrado = usuariosRegistrados.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    setTimeout(() => {
      // Si el correo está registrado, validamos su contraseña; si no, permitimos acceso rápido demo
      if (usuarioEncontrado && usuarioEncontrado.password !== password) {
        setMensaje({ texto: 'Contraseña incorrecta. Inténtalo de nuevo.', tipo: 'error' });
        setCargando(false);
        return;
      }

      const nombreFinal = usuarioEncontrado ? usuarioEncontrado.nombre : email.split('@')[0];

      localStorage.setItem('usuarioNombre', nombreFinal);
      localStorage.setItem('usuarioEmail', email);

      setMensaje({
        texto: `¡Bienvenida de nuevo, ${nombreFinal}! Entrando a la tienda...`,
        tipo: 'exito'
      });

      setTimeout(() => {
        setCargando(false);
        navigate('/');
      }, 1200);
    }, 600);
  };

  // 2. Manejar Registro de Nuevo Usuario
  const handleRegistroSubmit = (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setMensaje({ texto: 'La contraseña debe tener al menos 6 caracteres.', tipo: 'error' });
      return;
    }

    if (password !== confirmarPassword) {
      setMensaje({ texto: 'Las contraseñas no coinciden.', tipo: 'error' });
      return;
    }

    setCargando(true);

    setTimeout(() => {
      const usuariosRegistrados = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];
      const yaExiste = usuariosRegistrados.some(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (yaExiste) {
        setMensaje({ texto: 'Este correo ya está registrado. Inicia sesión.', tipo: 'error' });
        setCargando(false);
        return;
      }

      const nuevoUsuario = { nombre, email, password };
      usuariosRegistrados.push(nuevoUsuario);
      localStorage.setItem('usuariosRegistrados', JSON.stringify(usuariosRegistrados));

      // Inicia sesión automáticamente al registrarse
      localStorage.setItem('usuarioNombre', nombre);
      localStorage.setItem('usuarioEmail', email);

      setMensaje({
        texto: `¡Cuenta creada con éxito, ${nombre}! Bienvenida a Nicore Flowers 🌸`,
        tipo: 'exito'
      });

      setTimeout(() => {
        setCargando(false);
        navigate('/');
      }, 1400);
    }, 700);
  };

  // 3. Manejar Recuperación de Contraseña
  const handleRecuperarSubmit = (e) => {
    e.preventDefault();
    setCargando(true);

    setTimeout(() => {
      setMensaje({
        texto: `Hemos enviado un enlace de recuperación a ${email}. Revisa tu bandeja de entrada 💌`,
        tipo: 'exito'
      });
      setCargando(false);
    }, 700);
  };

  // 4. Acceso rápido con Google
  const handleGoogleLogin = () => {
    setCargando(true);
    setMensaje({ texto: 'Conectando con Google...', tipo: 'info' });

    setTimeout(() => {
      localStorage.setItem('usuarioNombre', 'Lorena Flores');
      localStorage.setItem('usuarioEmail', 'lorena.flores@gmail.com');

      setMensaje({
        texto: '¡Acceso exitoso con Google! Bienvenida, Lorena Flores.',
        tipo: 'exito'
      });

      setTimeout(() => {
        setCargando(false);
        navigate('/');
      }, 1200);
    }, 800);
  };

  // 5. Cerrar Sesión
  const handleCerrarSesion = () => {
    localStorage.removeItem('usuarioNombre');
    localStorage.removeItem('usuarioEmail');
    setUsuarioActivo(null);
    setMensaje({ texto: 'Has cerrado sesión correctamente.', tipo: 'info' });
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Panel Izquierdo */}
        <div className="login-image">
          <img src={IMAGENES.nicoreLogo} alt="Nicore Flowers" />
          <h3>
            {modo === 'registro' ? 'Únete a Nicore Flowers' : 'Bienvenida de nuevo'}
          </h3>
          <p>
            {modo === 'registro'
              ? 'Crea tu cuenta para guardar tus flores favoritas y personalizar tus ramos.'
              : 'Tus flores eternas favoritas te están esperando.'}
          </p>
        </div>

        {/* Panel Derecho */}
        <div className="login-form-container">
          {usuarioActivo ? (
            <div className="sesion-activa-box">
              <div className="avatar-circulo">
                {usuarioActivo.nombre.charAt(0).toUpperCase()}
              </div>
              <h2>¡Hola, {usuarioActivo.nombre}!</h2>
              <p style={{ color: '#7d7186', marginBottom: '20px' }}>
                Sesión iniciada como <strong>{usuarioActivo.email}</strong>
              </p>
              <button
                className="btn-login"
                onClick={() => navigate('/catalogo')}
              >
                Ir al Catálogo 🌸
              </button>
              <br />
              <button
                className="btn-cerrar-sesion"
                onClick={handleCerrarSesion}
              >
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <>
              {/* Selector de Pestañas */}
              {modo !== 'recuperar' && (
                <div className="auth-tabs">
                  <button
                    type="button"
                    className={`auth-tab ${modo === 'login' ? 'activa' : ''}`}
                    onClick={() => cambiarModo('login')}
                  >
                    Iniciar Sesión
                  </button>
                  <button
                    type="button"
                    className={`auth-tab ${modo === 'registro' ? 'activa' : ''}`}
                    onClick={() => cambiarModo('registro')}
                  >
                    Registrarse
                  </button>
                </div>
              )}

              {mensaje.texto && (
                <div className={`alerta-login alerta-${mensaje.tipo}`}>
                  {mensaje.texto}
                </div>
              )}

              {/* FORMULARIO: INICIAR SESIÓN */}
              {modo === 'login' && (
                <form onSubmit={handleLoginSubmit}>
                  <div className="input-group">
                    <label>Correo electrónico</label>
                    <input
                      type="email"
                      placeholder="tu@correo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={cargando}
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label>Contraseña</label>
                    <div className="password-wrapper">
                      <input
                        type={mostrarPass ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={cargando}
                        required
                      />
                      <button
                        type="button"
                        className="btn-ver-pass"
                        onClick={() => setMostrarPass(!mostrarPass)}
                        title={mostrarPass ? 'Ocultar' : 'Mostrar'}
                      >
                        <i className={`fa-solid ${mostrarPass ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                      </button>
                    </div>
                  </div>

                  <div className="form-options">
                    <button
                      type="button"
                      className="btn-link-recuperar"
                      onClick={() => cambiarModo('recuperar')}
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>

                  <button type="submit" className="btn-login" disabled={cargando}>
                    {cargando ? 'Ingresando...' : 'Entrar'}
                  </button>
                </form>
              )}

              {/* FORMULARIO: REGISTRO */}
              {modo === 'registro' && (
                <form onSubmit={handleRegistroSubmit}>
                  <div className="input-group">
                    <label>Nombre completo</label>
                    <input
                      type="text"
                      placeholder="Ej: María Camila Gómez"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      disabled={cargando}
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label>Correo electrónico</label>
                    <input
                      type="email"
                      placeholder="tu@correo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={cargando}
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label>Contraseña (mín. 6 caracteres)</label>
                    <div className="password-wrapper">
                      <input
                        type={mostrarPass ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={cargando}
                        required
                      />
                      <button
                        type="button"
                        className="btn-ver-pass"
                        onClick={() => setMostrarPass(!mostrarPass)}
                      >
                        <i className={`fa-solid ${mostrarPass ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                      </button>
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Confirmar contraseña</label>
                    <input
                      type={mostrarPass ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={confirmarPassword}
                      onChange={(e) => setConfirmarPassword(e.target.value)}
                      disabled={cargando}
                      required
                    />
                  </div>

                  <button type="submit" className="btn-login" disabled={cargando}>
                    {cargando ? 'Creando cuenta...' : 'Crear mi cuenta'}
                  </button>
                </form>
              )}

              {/* FORMULARIO: RECUPERAR CONTRASEÑA */}
              {modo === 'recuperar' && (
                <form onSubmit={handleRecuperarSubmit}>
                  <h2>Recuperar Contraseña</h2>
                  <p style={{ fontSize: '0.9rem', color: '#7d7186', marginBottom: '18px' }}>
                    Ingresa tu correo y te enviaremos instrucciones para restablecer tu clave.
                  </p>

                  <div className="input-group">
                    <label>Correo electrónico</label>
                    <input
                      type="email"
                      placeholder="tu@correo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={cargando}
                      required
                    />
                  </div>

                  <button type="submit" className="btn-login" disabled={cargando}>
                    {cargando ? 'Enviando...' : 'Enviar enlace de recuperación'}
                  </button>

                  <div style={{ textAlign: 'center', marginTop: '16px' }}>
                    <button
                      type="button"
                      className="btn-link-recuperar"
                      onClick={() => cambiarModo('login')}
                    >
                      ← Volver a Iniciar Sesión
                    </button>
                  </div>
                </form>
              )}

              {/* Google Login visible en Login y Registro */}
              {modo !== 'recuperar' && (
                <>
                  <div className="divider">
                    <span>o continúa con</span>
                  </div>

                  <button
                    type="button"
                    className="btn-google"
                    onClick={handleGoogleLogin}
                    disabled={cargando}
                  >
                    <img src={IMAGENES.gogli} alt="Google" />
                    Continuar con Google
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}