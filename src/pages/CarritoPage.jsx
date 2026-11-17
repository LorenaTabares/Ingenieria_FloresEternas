import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CarritoPage.css';

export function CarritoPage() {
  const [productos, setProductos] = useState([]);

  // Cargar los productos guardados en localStorage al abrir el carrito
  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    setProductos(carritoGuardado);
  }, []);

  // Eliminar un producto por su índice
  const handleEliminarItem = (indexAEliminar) => {
    const nuevosProductos = productos.filter((_, index) => index !== indexAEliminar);
    setProductos(nuevosProductos);
    localStorage.setItem('carrito', JSON.stringify(nuevosProductos));
  };

  // Calcular total automáticamente
  const totalCarrito = productos.reduce((total, p) => total + p.precio, 0);

  return (
    <div className="carrito-page">
      <div className="carrito-contenedor">
        <h2 className="carrito-titulo">Tu Carrito de Compras</h2>

        {productos.length === 0 ? (
          <div className="carrito-vacio">
            <p>Tu carrito está vacío 🌸</p>
            <Link to="/catalogo">
              <button className="btn-mas">Explorar el catálogo</button>
            </Link>
          </div>
        ) : (
          <>
            <div>
              {productos.map((p, index) => (
                <div key={index} className="carrito-item">
                  <img src={p.img} alt={p.nombre} className="carrito-item-img" />
                  <div className="carrito-item-info">
                    <h5>{p.nombre}</h5>
                    <p>{p.desc}</p>
                  </div>
                  <span className="carrito-item-precio">
                    ${p.precio.toLocaleString()}
                  </span>
                  <button
                    className="btn-eliminar"
                    onClick={() => handleEliminarItem(index)}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>

            <div className="carrito-resumen">
              <h4 className="carrito-total">
                Total: <span>${totalCarrito.toLocaleString()}</span>
              </h4>

              <div className="carrito-botones">
                <Link to="/catalogo">
                  <button className="btn-mas">Elegir más productos</button>
                </Link>
                <Link to="/compra">
                  <button className="btn-finalizar">Finalizar Compra</button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}