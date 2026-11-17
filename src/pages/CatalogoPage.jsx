import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IMAGENES } from '../assets/imagenes';
import './CatalogoPage.css';

const PRODUCTOS_CATALOGO = [
  {
    id: 1,
    nombre: "Ramo de Rosas Rojas Eternas",
    desc: "Elegante ramo artesanal confeccionado a mano con cinta satinada de alta gama.",
    precio: 65000,
    img: IMAGENES.ramoRosasRojas
  },
  {
    id: 2,
    nombre: "Ramo de Tulipanes Lila",
    desc: "Delicados tulipanes eternos en tonos pastel, ideales para regalar.",
    precio: 55000,
    img: IMAGENES.tulipanLila
  },
  {
    id: 3,
    nombre: "Corazón de Rosas Rosadas y Moradas",
    desc: "Arreglo especial en forma de corazón que conserva su belleza para siempre.",
    precio: 120000,
    img: IMAGENES.corazonRosasRosadasMoradas
  },
  {
    id: 4,
    nombre: "Ramo Azul y Blanco",
    desc: "Combinación fresca y sofisticada hecha pétalo por pétalo.",
    precio: 75000,
    img: IMAGENES.ramoFloresAzulesBlancas
  },
  {
    id: 5,
    nombre: "Rosa Individual Roja",
    desc: "Detalle clásico e inolvidable que nunca se marchita.",
    precio: 25000,
    img: IMAGENES.rosaRoja
  },
  {
    id: 6,
    nombre: "Ramo Rosas Negras y Doradas",
    desc: "Edición de lujo con acabados dorados para ocasiones únicas.",
    precio: 150000,
    img: IMAGENES.ramoRosasNegrasDoradas
  },
  {
    id: 7,
    nombre: "Ramo de Rosas Amarillas",
    desc: "Lleno de luz y alegría, perfecto para celebrar momentos especiales.",
    precio: 60000,
    img: IMAGENES.ramoRosasAmarillas
  },
  {
    id: 8,
    nombre: "Corazón de Rosas Rojas",
    desc: "El regalo romántico definitivo confeccionado artesanalmente.",
    precio: 135000,
    img: IMAGENES.corazonRosasRojas
  }
];

export function CatalogoPage() {
  const [precioMaximo, setPrecioMaximo] = useState(420000);
  const [productoAgregado, setProductoAgregado] = useState(null);

  const navigate = useNavigate();

  // Filtrar productos en tiempo real según el slider
  const productosFiltrados = PRODUCTOS_CATALOGO.filter(p => p.precio <= precioMaximo);

  // Añadir al carrito en localStorage
  const handleAgregarAlCarrito = (producto) => {
    const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];
    carritoActual.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carritoActual));
    setProductoAgregado(producto.nombre);
  };

  return (
    <div className="catalogo-page">
      <div className="catalogo-contenedor">
        <h4 className="catalogo-titulo-animado">
          Explora Nuestro Catálogo Y Enamórate De Nuestros Productos
        </h4>

        <div className="filtro-container">
          <label htmlFor="filtroPrecio" className="filtro-label">
            Filtrar por precio máximo:
          </label>
          <input
            type="range"
            className="filtro-slider"
            min="10000"
            max="420000"
            step="5000"
            id="filtroPrecio"
            value={precioMaximo}
            onChange={(e) => setPrecioMaximo(Number(e.target.value))}
          />
          <div>
            Precio: <span className="valor-precio">${precioMaximo.toLocaleString()}</span>
          </div>
        </div>

        {productoAgregado && (
          <div className="notificacion-carrito">
            <span>🌸 ¡<strong>{productoAgregado}</strong> añadido al carrito!</span>
            <button className="btn-ir-carrito" onClick={() => navigate('/carrito')}>
              Ver Carrito
            </button>
          </div>
        )}

        {productosFiltrados.length === 0 ? (
          <p className="mensaje-estado">
            No hay productos por debajo de ${precioMaximo.toLocaleString()}. Sube un poco el filtro 🌸
          </p>
        ) : (
          <div className="grid-productos">
            {productosFiltrados.map((prod) => (
              <div key={prod.id} className="card-producto">
                <div className="img-container">
                  <img src={prod.img} alt={prod.nombre} className="img-ramo" />
                </div>
                <div className="card-body">
                  <h5 className="producto-titulo">{prod.nombre}</h5>
                  <p className="producto-desc">{prod.desc}</p>
                  <div className="card-footer-info">
                    <p className="producto-precio">${prod.precio.toLocaleString()}</p>
                    <button
                      className="btn-agregar"
                      onClick={() => handleAgregarAlCarrito(prod)}
                    >
                      Añadir al carrito 🛒
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}