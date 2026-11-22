import { Link } from 'react-router-dom';
import { IMAGENES } from '../assets/imagenes';
import './Navbar.css';

export function Navbar() {
  return (
    <header className="navbar-header">
      <div className="navbar-contenedor">
        <Link to="/" className="navbar-logo-caja">
          <img src={IMAGENES.nicoreLogo} alt="Logo Nicore Flowers" className="navbar-logo-img" />
        </Link>

        <nav className="navbar-nav">
          <Link to="/" className="navbar-link">Inicio</Link>
          <Link to="/catalogo" className="navbar-link">Catálogo</Link>
          <Link to="/tipos" className="navbar-link">Tipos de Flores</Link>
          <Link to="/carrito" className="navbar-boton-carrito">
            <img src={IMAGENES.carritoCompras} alt="Carrito" className="navbar-icono-carrito" />
            <span>Carrito</span>
          </Link>
          <Link to="/contacto" className="navbar-link">Contacto</Link>
          <Link to="/admin/usuarios" className="navbar-link">Admin</Link>
        </nav>

        <div className="navbar-acciones">
          <div className="navbar-buscador">
            <input type="text" placeholder="Buscar..." className="navbar-input-buscar" />
            <button className="navbar-boton-lupa">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>

          {/* Cambiamos el div por Link apuntando a /login */}
          <Link to="/login" className="navbar-icono-usuario" title="Iniciar Sesión">
            <i className="fa-solid fa-user"></i>
          </Link>
        </div>
      </div>
    </header>
  );
}