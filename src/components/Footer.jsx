import { Link } from 'react-router-dom';
import { IMAGENES } from '../assets/imagenes';
import './Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-columnas">
        {/* Columna 1: Marca */}
        <div className="footer-columna">
          <img src={IMAGENES.nicoreLogo} alt="Logo Nicore Flowers" className="footer-logo-img" />
          <p className="footer-eslogan">Flores eternas hechas con amor y dedicación</p>
        </div>

        {/* Columna 2: Contacto */}
        <div className="footer-columna">
          <h4 className="footer-titulo">CONTÁCTANOS</h4>
          <p className="footer-texto">
            <i className="fa-solid fa-location-dot"></i> Calle Principal #123
          </p>
          <p className="footer-texto">
            <i className="fa-solid fa-phone"></i> +57 320 610 4806
          </p>
          <p className="footer-texto">
            <i className="fa-solid fa-envelope"></i> contacto@tufloreria.com
          </p>
        </div>

        {/* Columna 3: Redes */}
        <div className="footer-columna">
          <h4 className="footer-titulo">SÍGUENOS</h4>
          <ul className="footer-redes">
            <li>
              <a
                href="https://www.instagram.com/floreseternasnicore?igsh=MWJ6M2pxaTF2Y3k5cQ=="
                target="_blank"
                rel="noreferrer"
                className="footer-icon"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
            </li>
            <li>
              <a href="#" className="footer-icon">
                <i className="fa-brands fa-facebook"></i>
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/573206104806?text=Hola,%20quiero%20hacer%20un%20pedido"
                target="_blank"
                rel="noreferrer"
                className="footer-icon"
              >
                <i className="fa-brands fa-whatsapp"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Línea divisoria y enlaces inferiores */}
      <div className="footer-inferior">
        <div className="footer-enlaces">
          <Link to="/" className="footer-link">Inicio</Link>
          <Link to="/tipos" className="footer-link">Tipos de flores</Link>
          <Link to="/carrito" className="footer-link">Carrito</Link>
        </div>
        <p className="footer-copy">© 2026 Nicore | Diseñado con fines académicos</p>
      </div>
    </footer>
  );
}