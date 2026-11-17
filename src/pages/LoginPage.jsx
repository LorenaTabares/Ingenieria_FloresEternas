import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IMAGENES } from '../assets/imagenes';
import './LoginPage.css';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarPass, setMostrarPass] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });

  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setCargando(true);

    // Extraemos el nombre a partir del correo (ej: juan@correo.com -> juan)
    const nombreUsuario = email.split('@')[0];

    setTimeout(() => {
      localStorage.setItem('usuarioNombre', nombreUsuario);
      localStorage.setItem('usuarioEmail', email);

      setMensaje({
        texto: `¡Bienvenida de nuevo, ${nombreUsuario}! Redirigiendo a la tienda...`,
        tipo: 'exito'
      });

      setTimeout(() => {
        setCargando(false);
        navigate('/');
      }, 1200);
    }, 600);
  };

  const handleGoogleLogin = () => {
    setCargando(true);
    setMensaje({ texto: "Conectando con cuenta de Google...", tipo: 'info' });

    setTimeout(() => {
      localStorage.setItem('usuarioNombre', 'Lorena Flores');
      localStorage.setItem('usuarioEmail', 'lorena.flores@gmail.com');

      setMensaje({
        texto: "¡Acceso exitoso con Google! Bienvenida, Lorena Flores.",
        tipo: 'exito'
      });

      setTimeout(() => {
        setCargando(false);
        navigate('/');
      }, 1200);
    }, 800);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-image">
          <img src={IMAGENES.nicoreLogo} alt="Flores Eternas" />
          <h3>Bienvenida de nuevo</h3>
          <p>Tus flores favoritas te están esperando.</p>
        </div>

        <div className="login-form-container">
          <h2>Iniciar Sesión</h2>

          {mensaje.texto && (
            <div className={`alerta-login alerta-${mensaje.tipo}`}>
              {mensaje.texto}
            </div>
          )}

          <form onSubmit={handleLoginSubmit}>
            <div className="input-group">
              <label>Email</label>
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
                  type={mostrarPass ? "text" : "password"}
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
                  {mostrarPass ? "Ocultar" : "Ver"}
                </button>
              </div>
            </div>

            <div className="form-options">
              <a href="#recuperar" className="forgot-link">¿Olvidaste tu contraseña?</a>
            </div>

            <button type="submit" className="btn-login" disabled={cargando}>
              {cargando ? "Ingresando..." : "Entrar"}
            </button>
          </form>

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
            Iniciar sesión con Google
          </button>

          <p className="register-text">
            ¿No tienes cuenta? <span>Ingresa tus datos arriba para acceder al instante.</span>
          </p>
        </div>
      </div>
    </div>
  );
}