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
        </nav>

        <div className="navbar-acciones">
          <div className="navbar-buscador">
            <input type="text" placeholder="Buscar..." className="navbar-input-buscar" />
            <button className="navbar-boton-lupa">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
          <div className="navbar-icono-usuario">
            <i className="fa-solid fa-user"></i>
          </div>
        </div>
      </div>
    </header>
  );
}