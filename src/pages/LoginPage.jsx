import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IMAGENES } from '../assets/imagenes';
import './LoginPage.css';

const API_URL = "http://localhost:3000/api";

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // 1. LOGIN TRADICIONAL O REGISTRO AUTOMÁTICO SI ES NUEVO
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/login/tradicional`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        alert(`¡Bienvenido de nuevo, ${data.usuario.nombre}!`);

        localStorage.setItem('clienteID', data.usuario.clienteID);
        navigate('/'); // Redirige al inicio en React
      } else {
        alert("Usuario no encontrado en Nicore Flowers. Creando una cuenta nueva para ti...");
        const nombreTemporal = email.split('@')[0];

        const registroResponse = await fetch(`${API_URL}/registro/tradicional`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, nombre: nombreTemporal })
        });

        if (registroResponse.ok) {
          const registroData = await registroResponse.json();
          alert(`¡Cuenta creada con éxito!\nBienvenida a Flores Eternas.`);

          localStorage.setItem('clienteID', registroData.usuario.clienteID);
          navigate('/');
        } else {
          const errorText = await registroResponse.text();
          alert("Error al intentar registrarse: " + errorText);
        }
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("No se pudo conectar con el servidor local. Verifica que tu backend esté encendido.");
    }
  };

  // 2. LOGUEARSE O REGISTRARSE CON GOOGLE (Simulación Conectada)
  const handleGoogleLogin = async () => {
    alert("Conectando con Google... Generando registro automático en base de datos.");

    const usuarioGoogleSimulado = {
      idGoogle: "google_user_lore_" + Math.floor(Math.random() * 10000),
      nombre: "Lorena Flores",
      email: "lorena.prueba@gmail.com",
      fotoUrl: "https://via.placeholder.com/150"
    };

    try {
      const response = await fetch(`${API_URL}/login/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuarioGoogleSimulado)
      });

      const data = await response.json();

      if (response.ok) {
        alert(`¡Registro Exitoso vía Google! Guardado en SQL Server.\nBienvenido: ${data.usuario.nombre}`);
        localStorage.setItem('clienteID', data.usuario.clienteID);
        navigate('/');
      } else {
        alert("El servidor rechazó el registro de Google.");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("Error al intentar comunicarse con el servidor Node.js.");
    }
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

          <form onSubmit={handleLoginSubmit}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="tu@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Contraseña</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-options">
              <a href="#recuperar" className="forgot-link">¿Olvidaste tu contraseña?</a>
            </div>
            <br />

            <button type="submit" className="btn-login">Entrar</button>
          </form>

          <div className="divider">
            <span>o continúa con</span>
          </div>

          <button type="button" className="btn-google" onClick={handleGoogleLogin}>
            <img src={IMAGENES.gogli} alt="Google" />
            Iniciar sesión con Google
          </button>

          <p className="register-text">
            ¿No tienes cuenta? <a href="#registro">Regístrate aquí</a>
          </p>
        </div>
      </div>
    </div>
  );
}